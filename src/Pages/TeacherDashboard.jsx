import React, { useEffect, useState } from "react";
import Sidebar from "../T_Dashboard/Sidebar";
import API from "../API";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalAttempts: 0,
    avgScore: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const userId = user?._id;

        if (!userId) return;

        const res = await API.get(`/quiz/dashboard/${userId}`);
        setStats(res.data);
      } catch (error) {
        console.log("Dashboard error:", error);
      }
    };

    fetchStats();
  }, []);

return (
  <div className="flex bg-lightBg h-screen overflow-hidden">
    <Sidebar />

    <div className="ml-64 w-full p-8 overflow-y-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name || "Teacher"}
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your quizzes and track student performance
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        {/* TOTAL QUIZZES */}
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-sm opacity-80">Total Quizzes</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.totalQuizzes}
          </h2>
        </div>

        {/* TOTAL STUDENT ATTEMPTS */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-sm opacity-80">Student Attempts</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.totalAttempts}
          </h2>
        </div>

        {/* AVG SCORE */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-sm opacity-80">Average Score</p>
          <h2 className="text-3xl font-bold mt-2">
            {stats.avgScore}%
          </h2>
        </div>

      </div>

      {/* PROGRESS (Teacher version) */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
  <h3 className="text-lg font-semibold mb-4">
    Quiz Engagement
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5 text-sm">

    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-gray-500">Total Attempts</p>
      <p className="text-lg font-semibold text-gray-800">
        {stats.totalAttempts}
      </p>
    </div>

    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-gray-500">Avg Score</p>
      <p className="text-lg font-semibold text-gray-800">
        {stats.avgScore}%
      </p>
    </div>

    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-gray-500">Engagement Level</p>
      <p className="text-lg font-semibold text-gray-800">
        {stats.totalAttempts > 50 ? "High" : stats.totalAttempts > 20 ? "Medium" : "Low"}
      </p>
    </div>

  </div>

  {/* PROGRESS BAR */}
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-600">Performance</span>
      <span className="font-semibold text-blue-600">
        {stats.avgScore}%
      </span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all"
        style={{ width: `${stats.avgScore}%` }}
      ></div>
    </div>
  </div>
</div>

      {/* QUICK ACTIONS */}
      <div className="grid md:grid-cols-2 gap-6">

        <div
          onClick={() => navigate("/createquiz")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition active:scale-95"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            ✍️ Create Quiz
          </h3>
          <p className="text-gray-500 text-sm">
            Build and publish a new quiz for students
          </p>
        </div>

        <div
          onClick={() => navigate("/myquizzes")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition active:scale-95"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            🛠 Manage Quizzes
          </h3>
          <p className="text-gray-500 text-sm">
            Edit, delete or review your quizzes
          </p>
        </div>

        <div
          onClick={() => navigate("/teacher/results")}
          className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition active:scale-95"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            📊 View Results
          </h3>
          <p className="text-gray-500 text-sm">
            Analyze student performance and scores
          </p>
        </div>

      </div>

    </div>
  </div>
);
};

export default TeacherDashboard;