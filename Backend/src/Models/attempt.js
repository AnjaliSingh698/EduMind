import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
  answers: [Number],
  score: Number,
}, { timestamps: true });

export default mongoose.model("Attempt", attemptSchema);