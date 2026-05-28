import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import API from "../API";

const QuizResultsByQuiz = () => {
  const { quizId } = useParams();

  const [results, setResults] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get(`/quiz/results/quiz/${quizId}`);
        setResults(res.data);

        if (res.data.length > 0) {
          setQuiz(res.data[0].quiz);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  //  CALCULATE STATS
  const totalStudents = results.length;
  const avgScore =
    results.length > 0
      ? Math.round(
          results.reduce((acc, r) => {
            const totalQ = r.quiz?.questions?.length || 0;
            return acc + (totalQ ? (r.score / totalQ) * 100 : 0);
          }, 0) / results.length
        )
      : 0;

  return (
    <div className="flex bg-lightBg min-h-screen">
      <Sidebar />

      <div className="ml-64 w-full p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {quiz?.title || "Quiz Results"}
          </h1>
          <p className="text-gray-500 mt-1">
            All student attempts for this quiz
          </p>
        </div>

        {/* STATS */}
        {!loading && results.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-5 rounded-2xl shadow-sm border">
              <p className="text-sm text-gray-500">Total Attempts</p>
              <h2 className="text-2xl font-bold text-primary mt-1">
                {totalStudents}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border">
              <p className="text-sm text-gray-500">Average Score</p>
              <h2 className="text-2xl font-bold text-indigo-600 mt-1">
                {avgScore}%
              </h2>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : results.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <p className="text-lg">No attempts yet 📭</p>
          </div>
        ) : (
          /* RESULTS LIST */
          <div className="space-y-4">
            {results.map((r, i) => {
              const totalQ = r.quiz?.questions?.length || 0;
              const percent = totalQ
                ? Math.round((r.score / totalQ) * 100)
                : 0;

              // COLOR BASED ON SCORE
              let color = "bg-red-500";
              if (percent >= 75) color = "bg-green-500";
              else if (percent >= 50) color = "bg-yellow-500";

              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    {/* STUDENT INFO */}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {r.student?.fullname || "Unknown Student"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {r.student?.email || "User deleted"}
                      </p>
                    </div>

                    {/* SCORE */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-indigo-600">
                        {percent}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {r.score}/{totalQ}
                      </p>
                    </div>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${color}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResultsByQuiz;