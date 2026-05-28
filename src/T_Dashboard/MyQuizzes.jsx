import React, { useEffect, useState } from "react";
import API from "../API";
import Sidebar from "../T_Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyQuizzes = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.user?._id || user?._id;

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (!userId) return;

        const res = await API.get(`/quiz/teacher/${userId}`);
        setQuizzes(res.data);
      } catch (error) {
        toast.error("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [userId]);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">
          Are you sure you want to delete this quiz?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await API.delete(`/quiz/${id}/${userId}`);
                setQuizzes((prev) => prev.filter((q) => q._id !== id));
                toast.success("Quiz deleted ✅");
              } catch (error) {
                toast.error("Error deleting quiz ❌");
              }
            }}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex bg-lightBg h-screen overflow-hidden">
      <Sidebar />
      
      <div className="ml-64 w-full p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            My <span className="text-primary">Quizzes</span>
          </h2>

          <button
            onClick={() => navigate("/createquiz")}
            className="px-5 py-2 rounded-xl bg-primary text-white shadow-md hover:scale-105 hover:bg-secondary transition-all"
          >
            + Create Quiz
          </button>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 animate-pulse rounded-2xl"
              ></div>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <p className="text-lg mb-3">No quizzes created yet 😔</p>
            <button
              onClick={() => navigate("/create-quiz")}
              className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
            >
              Create Your First Quiz
            </button>
          </div>
        ) : (
          /* QUIZ GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="group relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* TOP BORDER ACCENT */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-t-2xl opacity-0 group-hover:opacity-100 transition"></div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                  {quiz.title}
                </h3>

                <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                  {quiz.description || "No description"}
                </p>

                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <p>📘 {quiz.subject?.name || quiz.subject || "N/A"}</p>
                  <p>⏱ {quiz.timeLimit} mins</p>
                  <p>❓ {quiz.questions?.length || 0} questions</p>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">
  {/* VIEW */}
  <button
    onClick={() => navigate(`/quiz/${quiz._id}`)}
    className="flex-1 py-2 rounded-lg bg-primary text-white font-medium 
    hover:bg-secondary hover:scale-105 transition-all duration-200 shadow-sm"
  >
    View
  </button>

  {/* RESULTS */}
  <button
    onClick={() => navigate(`/quiz-results/${quiz._id}`)}
    className="flex-1 py-2 rounded-lg bg-indigo-100 text-indigo-600 font-medium 
    hover:bg-indigo-500 hover:text-white hover:scale-105 transition-all duration-200"
  >
    Results
  </button>

  {/* DELETE */}
  <button
    onClick={() => handleDelete(quiz._id)}
    className="flex-1 py-2 rounded-lg border border-red-400 text-red-500 font-medium 
    hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200"
  >
    Delete
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuizzes;