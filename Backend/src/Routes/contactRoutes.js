import express from "express";
import { sendMessage } from "../Controller/contactController.js";

const router = express.Router();

router.post("/contact", sendMessage);

export default router;