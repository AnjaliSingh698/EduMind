import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../API";
import Sidebar from "../T_Dashboard/Sidebar";
import toast from "react-hot-toast";

const CreateQuiz = () => {
  const { register, handleSubmit, reset, watch } = useForm();

  const [activeIndex, setActiveIndex] = useState(0);

  const [questions, setQuestions] = useState([
    {
      question: "",
      option: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Handle question text
  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // Handle options
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].option[optIndex] = value;
    setQuestions(updated);
  };

  // Add question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        option: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  // Delete question
  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      toast.error("At least one question is required");
      return;
    }

    if (!window.confirm("Delete this question?")) return;

    setQuestions(questions.filter((_, i) => i !== index));
  };

  // VALIDATION
  const validateQuiz = () => {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.question.trim()) {
        toast.error(`Question ${i + 1} is empty`);
        return false;
      }

      if (q.option.some((opt) => !opt.trim())) {
        toast.error(`All options required in Question ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  // PUBLISH QUIZ
  const onSubmit = async (data) => {
    if (!validateQuiz()) return;

    try {
      const payload = {
        ...data,
        questions,
        createdBy: user._id,
        status: "published",
      };

      await API.post("/quiz/create", payload);

      toast.success("Quiz Published 🚀");

      reset();
      setQuestions([
        {
          question: "",
          option: ["", "", "", ""],
          correctAnswer: 0,
        },
      ]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating quiz");
    }
  };

  // SAVE DRAFT
  const handleSaveDraft = async () => {
    try {
      const payload = {
        title: watch("title"),
        description: watch("description"),
        subject: watch("subject"),
        timeLimit: watch("timeLimit"),
        questions,
        createdBy: user._id,
        status: "draft",
      };

      await API.post("/quiz/create", payload);

      toast.success("Saved as Draft 📝");
    } catch (error) {
      toast.error("Error saving draft");
    }
  };

  return (
    <div className="flex bg-lightBg h-screen overflow-hidden">
      <Sidebar />

      <div className="ml-64 w-full p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create <span className="text-primary">Quiz</span>
          </h2>
          <p className="text-sm text-gray-500">
            Build and publish quizzes for your students
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* QUIZ DETAILS */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">

            <input
              {...register("title", { required: true })}
              placeholder="Quiz Title"
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500"
            />

            <input
              {...register("subject", { required: true })}
              placeholder="Subject"
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500"
            />

            <input
              {...register("description")}
              placeholder="Description"
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="number"
              {...register("timeLimit", { required: true })}
              placeholder="Time Limit (minutes)"
              className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* QUESTIONS */}
          <div className="space-y-4">

            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                onClick={() => setActiveIndex(qIndex)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer
                  ${
                    activeIndex === qIndex
                      ? "bg-white shadow-lg border-indigo-500"
                      : "bg-gray-50 hover:bg-white hover:shadow"
                  }`}
              >

                <div className="flex justify-between mb-3">
                  <h4 className="font-semibold">
                    Question {qIndex + 1}
                  </h4>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteQuestion(qIndex);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>

                <input
                  onClick={(e) => e.stopPropagation()}
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  placeholder="Enter question..."
                  className="w-full p-3 border rounded mb-3"
                />

                {q.option.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    onClick={(e) => e.stopPropagation()}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, optIndex, e.target.value)
                    }
                    placeholder={`Option ${optIndex + 1}`}
                    className="w-full p-3 border rounded mb-2"
                  />
                ))}

                <select
                  onClick={(e) => e.stopPropagation()}
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctAnswer",
                      Number(e.target.value)
                    )
                  }
                  className="w-full p-3 border rounded"
                >
                  <option value={0}>Correct: Option 1</option>
                  <option value={1}>Option 2</option>
                  <option value={2}>Option 3</option>
                  <option value={3}>Option 4</option>
                </select>

              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-3 border-dashed border-2 rounded-xl hover:bg-gray-100"
            >
              + Add Question
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 sticky bottom-0 bg-gray-50 pt-4">

            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 py-3 bg-gray-300 rounded-xl"
            >
              Save Draft
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl"
            >
              Publish Quiz 🚀
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;