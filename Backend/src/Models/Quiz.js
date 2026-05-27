import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    option: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: Number,
        required: true
    },
});

const quizSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,

        //connect to subject
        subject: {
            type: String,
            required: true,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        questions: [questionSchema],

        totalMarks: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        timeLimit: {
            type: Number,
            default: 10,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Quiz", quizSchema);
