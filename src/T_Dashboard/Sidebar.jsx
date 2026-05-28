import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // prevent background scroll when modal open
  useEffect(() => {
    if (showLogoutConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showLogoutConfirm]);

  // active link style
  const linkClass = (path) =>
    `block px-4 py-2 rounded-xl transition ${
      location.pathname === path
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <div className="w-64 h-screen fixed top-0 left-0 bg-white border-r border-gray-200 p-6 flex flex-col shadow-sm">

      {/* MENU */}
      <ul className="space-y-2 mt-4 flex-1">

        <li>
          <Link to="/teacherdashboard" className={linkClass("/teacherdashboard")}>
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/createquiz" className={linkClass("/createquiz")}>
            Create Quiz
          </Link>
        </li>

        <li>
          <Link to="/myquizzes" className={linkClass("/myquizzes")}>
            My Quizzes
          </Link>
        </li>

        <li>
          <Link to="/teacher/drafts" className={linkClass("/teacher/drafts")}>
            My Drafts
          </Link>
        </li>

        <li>
          <Link to="/teacher/results" className={linkClass("/teacher/results")}>
            Quiz Results
          </Link>
        </li>
      </ul>

      {/* LOGOUT BUTTON */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        className="mt-4 w-full px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
      >
        Logout
      </button>

      {/* 🔥 LOGOUT MODAL */}
      {showLogoutConfirm &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-5">

              <h2 className="text-lg font-semibold text-gray-800">
                Logout from your account?
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
                  Logout
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