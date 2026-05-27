import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import Sidebar from "./Sidebar";

const ViewQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quiz/${id}`);
        setQuiz(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return (
      <div className="flex bg-lightBg min-h-screen">
        <Sidebar />
        <div className="ml-64 mt-15 p-8 w-full text-gray-600">
          Loading quiz...
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-lightBg min-h-screen">
      <Sidebar />

      <div className="ml-64 p-8 w-full">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {quiz.title}
          </h2>

          <p className="text-gray-600 mb-3">
            {quiz.description || "No description provided"}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-lg">
              📘 {quiz.subject}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-lg">
              ⏱ {quiz.timeLimit} mins
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-lg">
              ❓ {quiz.questions?.length} Questions
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions?.map((q, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              {/* Question */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {index + 1}. {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {q.option?.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      i === q.correctAnswer
                        ? "bg-green-50 border-green-400 text-green-700 font-semibold"
                        : "bg-gray-50 border-gray-200 text-gray-700"
                    }`}
                  >
                    {i + 1}. {opt}
                  </div>
                ))}
              </div>

              {/* Correct Answer Label */}
              <div className="mt-3 text-sm text-green-600 font-medium">
                ✅ Correct Answer: Option {q.correctAnswer + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewQuiz;