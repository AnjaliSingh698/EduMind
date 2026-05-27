import express from "express";

import {
    createSubject,
    getAllSubjects,
} from "../Controller/subjectController.js";

const router = express.Router();

//create Subject
router.post("/create", createSubject);

//Get all subject
router.get("/", getAllSubjects);

export default router;