import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      unique: true,
      trim: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);