// import React, { useEffect, useState } from "react";
// import API from "../API";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../S_Dashboard/Sidebar";

// const AllQuizzes = () => {
//     const [quizzes, setQuizzes] = useState([]);
//     const [search, setSearch] = useState("");
//     const [filter, setFilter] = useState("all");
//     const [results, setResults] = useState([]);
    
//     const navigate = useNavigate();

//     const user = JSON.parse(localStorage.getItem("user"));

//     const filteredQuizzes = quizzes
//   .filter(q =>
//     q.title.toLowerCase().includes(search.toLowerCase())
//   )
//   .filter(q => {
//     if (filter === "attempted") return q.attempted;
//     if (filter === "not_attempted") return !q.attempted;
//     return true;
//   });
// useEffect(() => {
//   const fetchQuizzes = async () => {
//     try {
//       const userId = user?._id;
//       if (!userId) return;

//       const res = await API.get(`/student/quizzes/${userId}`);
//       setQuizzes(res.data);

//       // ✅ ADD THIS
//       const resultRes = await API.get(`/student/results/${userId}`);
//       setResults(resultRes.data);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchQuizzes();
// }, []);

//     return (
//   <div className="flex mt-15 bg-gray-50 min-h-screen">
//     <Sidebar />

//     <div className="ml-64 w-full p-8">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">All Quizzes</h2>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="relative mb-8">
//         <input
//           type="text"
//           placeholder="Search quizzes..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//         <span className="absolute left-3 top-3 text-gray-400">🔍</span>
//       </div>

//       <div className="flex gap-3 mb-6">
//   {["all", "attempted", "not_attempted"].map((tab) => (
//     <button
//       key={tab}
//       onClick={() => setFilter(tab)}
//       className={`px-4 py-2 rounded-full text-sm capitalize transition ${
//         filter === tab
//           ? "bg-blue-600 text-white"
//           : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//       }`}
//     >
//       {tab.replace("_", " ")}
//     </button>
//   ))}
// </div>

//       {/* EMPTY STATE */}
//       {quizzes.length === 0 ? (
//         <div className="text-center text-gray-500 mt-20">
//           <p className="text-lg">No quizzes assigned yet 📭</p>
//         </div>
//       ) : (

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {[...filteredQuizzes]
//             .sort((a, b) => a.attempted - b.attempted)
//             .map((quiz) => (

              
//               <div
//                 key={quiz._id}
//                 className="relative bg-white p-5 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
//               >

//                 {/* Attempted Badge */}
//                 {quiz.attempted && (
//                   <span className="absolute top-3 right-3 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
//                     ✔ Attempted
//                   </span>
//                 )}

//                 {/* Title */}
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                   {quiz.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-gray-500 text-sm mb-4 line-clamp-2">
//                   {quiz.description}
//                 </p>

//                 {/* Button */}
//                 {quiz.attempted ? (
//                   <button
//                     disabled
//                     className="w-full py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
//                   >
//                     Completed
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => navigate(`/student/attempt/${quiz._id}`)}
//                     className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
//                   >
//                     Start Quiz
//                   </button>
//                 )}

//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   </div>
// );
// };

// export default AllQuizzes;

import React, { useEffect, useState } from "react";
import API from "../API";
import { useNavigate } from "react-router-dom";
import Sidebar from "../S_Dashboard/Sidebar";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ FILTER LOGIC (search + tabs)
  const filteredQuizzes = quizzes
    .filter(q =>
      q.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(q => {
      if (filter === "attempted") return q.attempted;
      if (filter === "not_attempted") return !q.attempted;
      return true;
    });

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userId = user?._id;
        if (!userId) return;

        const res = await API.get(`/student/quizzes/${userId}`);
        setQuizzes(res.data);

        const resultRes = await API.get(`/student/results/${userId}`);
        setResults(resultRes.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="ml-64 w-full p-8">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          All Quizzes
        </h2>

        {/* SEARCH */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>

        {/* TABS */}
        <div className="flex gap-3 mb-6">
          {["all", "attempted", "not_attempted"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm capitalize transition ${
                filter === tab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {quizzes.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No quizzes assigned yet 📭</p>
          </div>
        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[...filteredQuizzes]
              .sort((a, b) => a.attempted - b.attempted)
              .map((quiz) => {

                // ✅ FIND RESULT FOR THIS QUIZ
                const result = results.find(
                  r => r.quiz._id === quiz._id
                );

                const totalQuestions = quiz.questions?.length || 0;
                const score = result?.score || 0;

                const percentage = totalQuestions
                  ? Math.round((score / totalQuestions) * 100)
                  : 0;

                return (
                  <div
                    key={quiz._id}
                    className="relative bg-white p-5 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                  >

                    {/* BADGE */}
                    {quiz.attempted && (
                      <span className="absolute top-3 right-3 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                        ✔ Attempted
                      </span>
                    )}

                    {/* TITLE */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {quiz.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {quiz.description}
                    </p>

                    {/* TIME LIMIT */}
                    <div className="flex justify-between items-center mb-3">
  <span className="text-xs text-gray-400">
    {quiz.questions?.length || 0} Questions
  </span>

  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
    ⏱ {quiz.timeLimit} min
  </span>
</div>
                    {/* QUESTIONS */}
                    <p className="text-xs text-gray-400 mb-2">
                      Questions: {totalQuestions}
                    </p>

                    {/* PROGRESS */}
                    {quiz.attempted && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>
                            Score: {score}/{totalQuestions}
                          </span>
                          <span>{percentage}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* BUTTON */}
                    {quiz.attempted ? (
                      <button
                        disabled
                        className="w-full py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                      >
                        Completed
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          navigate(`/student/attempt/${quiz._id}`)
                        }
                        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                      >
                        Start Quiz
                      </button>
                    )}

                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllQuizzes;