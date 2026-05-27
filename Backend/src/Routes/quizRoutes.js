import express from "express";
import Quiz from "../Models/Quiz.js";
import {
  getDashboardStats,
  createQuiz,
  saveDraft,
  getDrafts,        
  publishQuiz,     
  getMyQuizzes,
  deleteQuiz,
  getAllQuizzes,
  getTeacherResults
} from "../Controller/quizController.js";
import attempt from "../Models/attempt.js";


const router = express.Router();

//get all quizzes
router.get("/", getAllQuizzes);

//Dashboard stats
router.get("/dashboard/:userId", getDashboardStats);

// Create Quiz (Teacher)
router.post("/create", createQuiz);

//Publish Quiz
router.put("/publish/:id", publishQuiz);

//Save Draft
router.get("/drafts/:userId", getDrafts);

//Get teacher's quizzes
router.get("/teacher/:userId", getMyQuizzes);

//delete quiz
router.delete("/:id/:userId", deleteQuiz);

// GET results by quiz
router.get("/results/quiz/:quizId", async (req, res) => {
  try {
    const { quizId } = req.params;

    const results = await attempt.find({
      $or: [
        { quiz: quizId },
        { quizId: quizId }
      ]
    })
    .populate("student", "fullname email")
    .populate("quiz", "title questions");

    const filtered = results.filter(
      r => r.student && r.student.fullname
    );

    res.json(filtered);

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

//get teacher's results
router.get("/results/:userId", getTeacherResults);

//get single quiz (view button)
router.get("/:id", async (req, res) => {
   try {
    const quiz = await Quiz.findById(req.params.id);

    if(!quiz) {
      return res.status(404).json({message: "Quiz not found"});
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;