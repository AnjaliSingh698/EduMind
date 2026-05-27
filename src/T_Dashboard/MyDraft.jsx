// import React, { useEffect, useState } from "react";
// import Sidebar from "../T_Dashboard/Sidebar";
// import API from "../API";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const MyDrafts = () => {
//   const [drafts, setDrafts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "null");

//   useEffect(() => {
//     const fetchDrafts = async () => {
//       try {
//         if (!user?._id) return;

//         const res = await API.get(`/quiz/drafts/${user._id}`);
//         setDrafts(res.data);
//       } catch (error) {
//         toast.error("Error loading drafts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDrafts();
//   }, []);

//   return (
//     <div className="flex bg-lightBg min-h-screen">
//       <Sidebar />

//       <div className="ml-64 w-full p-8">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-10">
//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-900">
//               My <span className="text-primary">Drafts</span>
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Continue building your quizzes
//             </p>
//           </div>
//         </div>

//         {/* LOADING */}
//         {loading ? (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-40 bg-gray-200 animate-pulse rounded-2xl"
//               />
//             ))}
//           </div>
//         ) : drafts.length === 0 ? (
//           /* EMPTY STATE */
//           <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
//             <p className="text-lg mb-3">No drafts yet 📝</p>
//             <button
//               onClick={() => navigate("/create-quiz")}
//               className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:scale-105 transition-all"
//             >
//               Create Draft
//             </button>
//           </div>
//         ) : (
//           /* DRAFT GRID */
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {drafts.map((quiz) => (
//               <div
//                 key={quiz._id}
//                 className="group relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
//               >
//                 {/* TOP GRADIENT LINE */}
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition"></div>

//                 {/* TITLE + BADGE */}
//                 <div className="flex justify-between items-center mb-2">
//                   <h2 className="font-bold text-lg text-gray-800 group-hover:text-primary transition">
//                     {quiz.title || "Untitled Quiz"}
//                   </h2>

//                   <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full animate-pulse">
//                     Draft
//                   </span>
//                 </div>

//                 {/* DESCRIPTION */}
//                 <p className="text-sm text-gray-500 mb-4 line-clamp-2">
//                   {quiz.description || "No description"}
//                 </p>

//                 {/* META */}
//                 <div className="flex justify-between text-sm text-gray-400 mb-5">
//                   <span>❓ {quiz.questions.length} questions</span>
//                   <span>⏱ {quiz.timeLimit} mins</span>
//                 </div>

//                 {/* ACTIONS */}
//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => navigate(`/edit-quiz/${quiz._id}`)}
//                     className="flex-1 py-2 rounded-lg bg-primary text-white hover:bg-secondary hover:scale-105 transition-all"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={async () => {
//                       try {
//                         await API.put(`/quiz/publish/${quiz._id}`);
//                         toast.success("Published successfully 🚀");
//                         setDrafts((prev) =>
//                           prev.filter((d) => d._id !== quiz._id)
//                         );
//                       } catch {
//                         toast.error("Error publishing ❌");
//                       }
//                     }}
//                     className="flex-1 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all"
//                   >
//                     Publish
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyDrafts;

import React, { useEffect, useState } from "react";
import Sidebar from "../T_Dashboard/Sidebar";
import API from "../API";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?._id || user?.user?._id;

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        if (!userId) return;

        const res = await API.get(`/quiz/drafts/${userId}`);
        setDrafts(res.data);
      } catch (error) {
        toast.error("Error loading drafts ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [userId]);

  // ✅ DELETE DRAFT
  const handleDelete = (quizId) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">
          Are you sure you want to delete this draft?
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
                await API.delete(`/quiz/${quizId}/${userId}`);

                setDrafts((prev) =>
                  prev.filter((d) => d._id !== quizId)
                );

                toast.success("Draft deleted 🗑️");
              } catch {
                toast.error("Error deleting draft ❌");
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

  // ✅ PUBLISH DRAFT
  const handlePublish = async (quizId) => {
    try {
      await API.put(`/quiz/publish/${quizId}`);

      setDrafts((prev) =>
        prev.filter((d) => d._id !== quizId)
      );

      toast.success("Published successfully 🚀");
    } catch {
      toast.error("Error publishing ❌");
    }
  };

  return (
    <div className="flex bg-lightBg min-h-screen">
      <Sidebar />

      <div className="ml-64 w-full p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              My <span className="text-primary">Drafts</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Continue building your quizzes
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : drafts.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
            <p className="text-lg mb-3">No drafts yet 📝</p>
            <button
              onClick={() => navigate("/createquiz")}
              className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:scale-105 transition-all"
            >
              Create Draft
            </button>
          </div>
        ) : (
          /* DRAFT GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((quiz) => (
              <div
                key={quiz._id}
                className="group relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* TOP GRADIENT */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition"></div>

                {/* TITLE */}
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-lg text-gray-800 group-hover:text-primary transition">
                    {quiz.title || "Untitled Quiz"}
                  </h2>

                  <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full animate-pulse">
                    Draft
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {quiz.description || "No description"}
                </p>

                {/* META */}
                <div className="flex justify-between text-sm text-gray-400 mb-5">
                  <span>❓ {quiz.questions.length} questions</span>
                  <span>⏱ {quiz.timeLimit} mins</span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="flex-1 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:scale-105 transition-all"
                  >
                    Delete
                  </button>

                  {/* PUBLISH */}
                  <button
                    onClick={() => handlePublish(quiz._id)}
                    className="flex-1 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 hover:scale-105 transition-all"
                  >
                    Publish
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

export default MyDrafts;