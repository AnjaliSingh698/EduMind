import React, { useEffect, useState } from "react";
import Sidebar from "../S_Dashboard/Sidebar";
import API from "../API";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    attempted: 0,
    avgScore: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  if (!user?._id) return;

  const fetchStats = async () => {
    try {
      const res = await API.get(`/student/dashboard/${user._id}`);
      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
  }, [user]);

  // ✅ 👉 ADD IT HERE (BEFORE return)
  const progress = stats.totalQuizzes
    ? Math.min(
        Math.round((stats.attempted / stats.totalQuizzes) * 100),
        100
      )
    : 0;

  return (
  <div className="flex bg-gray-50 min-h-screen">
    <Sidebar />

    <div className="ml-64 w-full p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name || "Student"}
        </h1>
        <p className="text-gray-500 mt-1">
          Track your performance and keep improving
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-600">Loading dashboard...</p>
      ) : (
        <>
          {/* STATS CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">

            {/* TOTAL QUIZZES */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
              <p className="text-sm opacity-80">Total Quizzes</p>
              <h2 className="text-3xl font-bold mt-2">{stats.totalQuizzes}</h2>
            </div>

            {/* ATTEMPTED */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
              <p className="text-sm opacity-80">Attempted</p>
              <h2 className="text-3xl font-bold mt-2">{stats.attempted}</h2>
            </div>

            {/* AVG SCORE */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
              <p className="text-sm opacity-80">Average Score</p>
              <h2 className="text-3xl font-bold mt-2">{stats.avgScore}%</h2>
            </div>

          </div>

          {/* PROGRESS SECTION */}
          <div className="bg-white p-6 rounded-2xl shadow mb-8">
  <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>

  <div className="flex justify-between items-center mb-2">
    <span className="text-sm text-gray-600">
      {stats.attempted} of {stats.totalQuizzes} quizzes completed
    </span>

    <span className="text-sm font-semibold text-blue-600">
      {progress}%
    </span>
  </div>

  <div className="w-full bg-gray-200 rounded-full h-3">
    <div
      className="bg-blue-600 h-3 rounded-full transition-all"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
</div>

          {/* QUICK ACTIONS */}
          <div className="grid md:grid-cols-2 gap-6">

            <div
              onClick={() => navigate("/student/quizzes")}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📘 Start a Quiz
              </h3>
              <p className="text-gray-500 text-sm">
                Attempt available quizzes and test your knowledge
              </p>
            </div>

            <div
              onClick={() => navigate("/student/results")}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📊 View Results
              </h3>
              <p className="text-gray-500 text-sm">
                Check your scores and performance history
              </p>
            </div>

          </div>
        </>
      )}
    </div>
  </div>
);
};

export default StudentDashboard;