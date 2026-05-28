import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import subjectRoutes from "./Routes/subjectRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import quizRoutes from "./Routes/quizRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js"

import cors from "cors";

dotenv.config();

const app = express();

//Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://anjalisingh698.github.io"
  ],
  credentials: true
}));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//DB connection
const PORT = process.env.PORT || 6000;
const URI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MONGODB_URL:", process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("MongoDB Error:", error);
    process.exit(1);
  }
};

connectDB();

//  ROUTES
app.use("/subject", subjectRoutes);
app.use("/user", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/student", studentRoutes);
app.use("/api", contactRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

//  SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});