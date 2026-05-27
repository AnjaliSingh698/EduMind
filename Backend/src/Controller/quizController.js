import Quiz from "../Models/Quiz.js";
import User from "../Models/user.js";
import attempt from "../Models/attempt.js";


//Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const teacherId = req.params.userId;

    // ✅ ONLY PUBLISHED QUIZZES
    const quizzes = await Quiz.find({
      createdBy: teacherId,
      status: "published",
    });

    const quizIds = quizzes.map(q => q._id);

    // ✅ TOTAL PUBLISHED QUIZZES
    const totalQuizzes = quizzes.length;

    // ✅ ONLY ATTEMPTS FOR PUBLISHED QUIZZES
    const attempts = await attempt
      .find({ quiz: { $in: quizIds } })
      .populate("quiz");

    const totalAttempts = attempts.length;

    // ✅ AVG SCORE (ONLY VALID QUIZZES)
    let totalScore = 0;
    let totalQuestions = 0;

    attempts.forEach(a => {
      if (a.quiz && a.quiz.status === "published") {
        totalScore += a.score || 0;
        totalQuestions += a.quiz.questions.length;
      }
    });

    const avgScore =
      totalQuestions > 0
        ? Math.round((totalScore / totalQuestions) * 100)
        : 0;

    res.json({
      totalQuizzes,
      totalAttempts,
      avgScore,
    });

  } catch (error) {
    console.log("Dashboard error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create Quiz (Teacher)
export const createQuiz = async (req, res) => {
  try {
    const { title, description, subject, questions, timeLimit, createdBy } = req.body;

    const user = await User.findById(createdBy);

    if (!user || user.role !== "Teacher") {
      return res.status(403).json({ message: "Only teachers can create quizzes" });
    }

    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "At least one question required" });
    }

    const quiz = await Quiz.create({
  title,
  description,
  subject,
  questions,
  timeLimit,
  createdBy,
  totalMarks: questions.length,
  status: req.body.status || "draft",
});
    res.status(201).json({ message: "Quiz created successfully", quiz });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Publish quiz
export const publishQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { status: "published" },
      { new: true }
    );

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error publishing quiz" });
  }
};

//Save Draft
export const saveDraft = async (req, res) => {
  try {
    const { title, description, subject, questions, timeLimit, createdBy } = req.body;

    const quiz = await Quiz.create({
  title,
  description,
  subject,
  questions,
  timeLimit,
  createdBy,
  totalMarks: questions.length,
  status: "draft", 
});

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error saving draft" });
  }
};

//Get Draft
export const getDrafts = async (req, res) => {
  try {
    const { userId } = req.params;

    const drafts = await Quiz.find({
      createdBy: userId,
      status: "draft",
    }).sort({ createdAt: -1 });

    res.json(drafts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching drafts" });
  }
};

// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
  status: "published",
}).populate("createdBy", "name email");
   
    res.json(quizzes);
  } catch (error) {
    console.log("Get All Quizzes error:",error);
    res.status(500).json({ message: error.message });
  }
};

// Get quiz by Id
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("createdBy", "name email");
   
    if (!quiz) {
  return res.status(404).json({ message: "Quiz not found" });
}
    
    res.json(quiz);
  } catch (error) {
    console.log("Get quiz by id:",error);
    res.status(500).json({ message: "Error fetching quiz" });
  }
};

//Get teacher's quizzes
export const getMyQuizzes = async (req, res) => {
  try {
    const userId = req.params.userId;

    const quizzes = await Quiz.find({
  createdBy: userId,
  status: "published",
}).sort({ createdAt: -1 });

    res.json(quizzes);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const userId = req.params.userId;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await attempt.deleteMany({ quiz: quizId });
    await quiz.deleteOne();

    res.json({ message: "Quiz deleted successfully" });

  } catch (error) {
    console.log("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get teacher's quiz results
export const getTeacherResults = async (req, res) => {
  try {
    const teacherId = req.params.userId;

    // ✅ ONLY PUBLISHED QUIZZES
    const quizzes = await Quiz.find({
      createdBy: teacherId,
      status: "published",
    });

    const quizIds = quizzes.map(q => q._id);

    const results = await attempt
      .find({ quiz: { $in: quizIds } })
      .populate("student", "fullname email")
      .populate("quiz", "title questions status");

    // ✅ REMOVE INVALID / DELETED USERS / UNPUBLISHED
    const filtered = results.filter(
      r => r.student && r.quiz && r.quiz.status === "published"
    );

    res.json(filtered);

  } catch (error) {
    console.log("Teacher results error:", error);
    res.status(500).json({ message: error.message });
  }
};