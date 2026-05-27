import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">

      <div className="flex justify-between items-center px-6 md:px-10 py-4">

        {/* LEFT - Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-violet-800 text-white px-3 py-1 rounded-xl font-bold">
            E
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            EDUMIND
          </h1>
        </div>

        {/* CENTER - Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-violet-800 transition">Home</Link>
          <Link to="/features" className="hover:text-violet-800 transition">Features</Link>
          <Link to="/about" className="hover:text-violet-800 transition">About</Link>
          <Link to="/contact" className="hover:text-violet-800 transition">Contact</Link>
        </div>

        {/* RIGHT - Buttons */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-violet-800 text-white hover:bg-violet-700 transition shadow-sm"
          >
            Sign Up
          </Link>

        </div>

      </div>


      {/* MOBILE MENU */}
      <div className="lg:hidden px-6 pb-4">
        <div className="flex flex-col gap-3 text-gray-600">
          <Link to="/" className="hover:text-violet-800">Home</Link>
          <Link to="/features" className="hover:text-violet-800">Features</Link>
          <Link to="/about" className="hover:text-violet-800">About</Link>
          <Link to="/contact" className="hover:text-violet-800">Contact</Link>
        </div>
      </div>

    </div>
  );
};

export default Navbar;

