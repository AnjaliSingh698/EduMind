import Quiz from "../Models/Quiz.js";
import attempt from "../Models/attempt.js";

export const getStudentDashboardStats = async (req, res) => {
  try {
    const studentId = req.params.userId;

    // ✅ ONLY PUBLISHED QUIZZES
    const publishedQuizzes = await Quiz.find({ status: "published" });

    const totalQuizzes = publishedQuizzes.length;

    const publishedQuizIds = publishedQuizzes.map(q => q._id.toString());

    // ✅ GET ONLY ATTEMPTS OF PUBLISHED QUIZZES
    const attempts = await attempt
      .find({ student: studentId })
      .populate("quiz");

    const validAttempts = attempts.filter(a =>
      a.quiz && publishedQuizIds.includes(a.quiz._id.toString())
    );

    // ✅ UNIQUE QUIZ COUNT
    const uniqueQuizIds = new Set(
      validAttempts.map(a => a.quiz._id.toString())
    );

    const attempted = uniqueQuizIds.size;

    // ✅ AVG SCORE
    let totalScore = 0;
    let totalQuestions = 0;

    validAttempts.forEach(att => {
      totalScore += att.score || 0;
      totalQuestions += att.quiz.questions.length;
    });

    const avgScore =
      totalQuestions > 0
        ? Math.round((totalScore / totalQuestions) * 100)
        : 0;

    res.json({
      totalQuizzes,
      attempted,
      avgScore,
    });

  } catch (err) {
    console.log("Dashboard Error:", err);
    res.status(500).json({ error: err.message });
  }
};
// get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const studentId = req.params.userId;

    const quizzes = await Quiz.find({
  status: "published"
}).select("title description questions timeLimit");

    const attempts = await attempt.find({
      student: studentId,
    });

    const attemptedQuizIds = attempts.map(a => a.quiz.toString());

    const updatedQuizzes = quizzes.map(q => ({
      ...q.toObject(),
      attempted: attemptedQuizIds.includes(q._id.toString()),
    }));

    res.json(updatedQuizzes);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Submit Quiz
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID missing" });
    }

    const quizData = await Quiz.findById(quizId);

    if (!quizData) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;

    quizData.questions.forEach((q, index) => {
      if (answers[index] !== undefined && q.correctAnswer === answers[index]) {
        score++;
      }
    });

    const existing = await attempt.findOne({
      student: studentId,
      quiz: quizId
    });

    if (existing) {
      return res.status(400).json({
    msg: "You have already attempted this quiz"
  });

      
    } else {
      await attempt.create({
        student: studentId,
        quiz: quizId,
        answers,
        score,
      });
    }

    res.json({ message: "Submitted", score });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Result / progress
export const getResults = async (req, res) => {
  try {
    const studentId = req.params.userId;

    const results = await attempt
      .find({ student: studentId })
      .populate("quiz", "title questions status");

    // ✅ ONLY SHOW PUBLISHED QUIZ RESULTS
    const filteredResults = results.filter(
      r => r.quiz && r.quiz.status === "published"
    );

    res.json(filteredResults);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};