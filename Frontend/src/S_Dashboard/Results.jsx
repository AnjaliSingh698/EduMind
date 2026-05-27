import React, { useEffect, useState } from "react";
import API from "../API";
import Sidebar from "../S_Dashboard/Sidebar";

const Results = () => {
  const [results, setResults] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!userId) return;

        const res = await API.get(`/student/results/${userId}`);
        setResults(res.data);
      } catch (err) {
        console.log("RESULT ERROR:", err);
      }
    };

    fetchResults();
  }, [userId]);

const uniqueResults = Object.values(
    results.reduce((acc, curr) => {
      if (!curr.quiz) return acc;

      acc[curr.quiz._id] = curr; // keeps latest only
      return acc;
    }, {})
  );

  return (
  <div className="flex bg-gray-50 min-h-screen">
    <Sidebar />

    <div className="ml-64 w-full p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Results 📊</h2>
        <p className="text-gray-500 text-sm mt-1">
          Track your performance across quizzes
        </p>
      </div>

      {/* EMPTY STATE */}
      {results.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-lg">No results yet 📭</p>
          <p className="text-sm">Start attempting quizzes to see results</p>
        </div>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {uniqueResults.map((r, i) => {
            if (!r.quiz) return null;

            const totalQ = r.quiz.questions?.length || 0;
            const percent = totalQ
              ? Math.round((r.score / totalQ) * 100)
              : 0;

            // 🎯 Performance color
            let color = "bg-red-500";
            if (percent >= 75) color = "bg-green-500";
            else if (percent >= 50) color = "bg-yellow-500";

            return (
              <div
  key={i}
  className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
>
  {/* Title + % */}
  <div className="flex justify-between items-center mb-3">
    <h3 className="text-lg font-semibold text-gray-800">
      {r.quiz.title}
    </h3>

    <span className="text-xl font-bold text-indigo-600">
      {percent}%
    </span>
  </div>

  {/* Score */}
  <p className="text-sm text-gray-500 mb-3">
    {r.score} / {totalQ} correct
  </p>

  {/* Progress Bar (dynamic color) */}
  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
    <div
      className={`h-2 rounded-full transition-all ${
        percent >= 80
          ? "bg-green-500"
          : percent >= 50
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{ width: `${percent}%` }}
    ></div>
  </div>
</div>    );
          })}
        </div>
      )}
    </div>
  </div>
);
};

export default Results;
