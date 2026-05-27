import express from "express";

import { 
    getAllQuizzes,
    submitQuiz,
    getResults,
    getStudentDashboardStats
 } from "../Controller/StudentController.js";

const router = express.Router();

router.get("/dashboard/:userId", getStudentDashboardStats);
router.get("/quizzes/:userId", getAllQuizzes);
router.post("/submit", submitQuiz);
router.get("/results/:userId", getResults);

export default router;