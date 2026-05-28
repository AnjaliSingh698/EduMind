import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import API from "../API";
import { useNavigate } from "react-router-dom";

const QuizResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalAttempts: 0,
    avgScore: 0,
    topScore: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get(`/quiz/results/${userId}`);
        setResults(res.data);

        let totalAttempts = res.data.length;
        let totalScore = 0;
        let totalQuestions = 0;
        let topScore = 0;

        res.data.forEach((r) => {
          const questions = r.quiz?.questions?.length || 0;

          totalScore += r.score;
          totalQuestions += questions;

          const percent = questions ? (r.score / questions) * 100 : 0;
          if (percent > topScore) topScore = percent;
        });

        const avgScore =
          totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

        setStats({
          totalAttempts,
          avgScore: Math.round(avgScore),
          topScore: Math.round(topScore),
        });
      } catch (error) {
        console.log("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchResults();
  }, [userId]);

  // color logic for scores
  const getColor = (percent) => {
    if (percent >= 75) return "text-green-600";
    if (percent >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getBarColor = (percent) => {
    if (percent >= 75) return "bg-green-500";
    if (percent >= 50) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="flex bg-lightBg h-screen overflow-hidden">
      <Sidebar />

      <div className="ml-64 w-full p-8 overflow-y-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Results <span className="text-primary">& Analytics</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track student performance in real-time
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Total Attempts",
              value: stats.totalAttempts,
              color: "from-indigo-500 to-indigo-600",
            },
            {
              label: "Average Score",
              value: `${stats.avgScore}%`,
              color: "from-green-500 to-emerald-600",
            },
            {
              label: "Top Score",
              value: `${stats.topScore}%`,
              color: "from-pink-500 to-rose-500",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <p className="text-sm text-gray-500">{card.label}</p>
              <h2
                className={`text-3xl font-bold mt-2 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
              >
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        {/* RESULTS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Object.values(
    results.reduce((acc, r) => {
      const quizId = r.quiz?._id;

      if (!acc[quizId]) {
        acc[quizId] = {
          quiz: r.quiz,
          attempts: 0,
          totalScore: 0,
          totalQuestions: 0,
        };
      }

      const qLength = r.quiz?.questions?.length || 0;

      acc[quizId].attempts += 1;
      acc[quizId].totalScore += r.score;
      acc[quizId].totalQuestions += qLength;

      return acc;
    }, {})
  ).map((item, i) => {
    const avg = item.totalQuestions
      ? Math.round(
          (item.totalScore / item.totalQuestions) * 100
        )
      : 0;

    return (
      <div
        key={i}
        className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {item.quiz?.title}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {item.quiz?.description}
        </p>

        <div className="text-sm text-gray-600 mb-4 space-y-1">
          <p>👥 Attempts: {item.attempts}</p>
          <p>📊 Avg Score: {avg}%</p>
        </div>

        <button
          onClick={() =>
            navigate(`/quiz-results/${item.quiz._id}`)
          }
          className="w-full py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          View Results
        </button>
      </div>
    );
  })}
</div>
          
        </div>
      </div>
    
  );
};

export default QuizResults;