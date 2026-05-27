// import React from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem("user");
//   navigate("/login");
// };
//   return (
//     <div className="w-64 h-screen bg-blue-900 text-white p-5 fixed">

//       <ul className="space-y-4">

//         <li>
//           <Link
//             to="/studentdashboard"
//             className="block hover:bg-blue-700 p-2 rounded"
//           >
//             Dashboard
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/student/quizzes"
//             className="block hover:bg-blue-700 p-2 rounded"
//           >
//             All Quizzes
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/student/results"
//             className="block hover:bg-blue-700 p-2 rounded"
//           >
//             Results
//           </Link>
//         </li>

//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
  if (showLogoutConfirm) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showLogoutConfirm]);

  const linkClass = (path) =>
    `block px-4 py-3 rounded-xl transition-all duration-200 ${
      location.pathname === path
        ? "bg-white text-blue-700 font-semibold shadow"
        : "text-blue-100 hover:bg-blue-800 hover:text-white"
    }`;

  return (
    <div className="w-64 fixed top-0 bottom-0 overflow-y-auto bg-gradient-to-b from-blue-900 to-blue-800 p-5 flex flex-col justify-between">

      {/* MENU */}
      <div>
        <ul className="space-y-3 mt-4">

          <li>
            <Link to="/studentdashboard" className={linkClass("/studentdashboard")}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/student/quizzes" className={linkClass("/student/quizzes")}>
              All Quizzes
            </Link>
          </li>

          <li>
            <Link to="/student/results" className={linkClass("/student/results")}>
              Results
            </Link>
          </li>

        </ul>
      </div>

      {/* LOGOUT BUTTON */}
      {/* BOTTOM ACTIONS */}
<div className="mt-6">

  <button
    onClick={() => setShowLogoutConfirm(true)}
    className="w-full py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-md border border-white/20"
  >
    Log Out
  </button>

</div>

{/* MODERN CONFIRMATION DRAWER */}
{showLogoutConfirm &&
  createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-5">

        <h2 className="text-lg font-semibold text-gray-800">
          Log out of your account?
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          You’ll need to log in again to continue.
        </p>

        <div className="flex gap-3 mt-5">

          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Log Out
          </button>

          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>,
    document.body
  )}
    </div>
  );
};

export default Sidebar;