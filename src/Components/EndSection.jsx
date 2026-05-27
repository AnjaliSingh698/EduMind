// import React from "react"

// const EndSection = () => {
//   return (
//     <>
//       <div className="hero h-[400px] bg-linear-to-r from-teal-600 to-blue-500">
//         <div className="hero-content text-center">
//           <div className="max-w-4xl">
//             <h1 className="text-5xl text-white font-extrabold">
//               Ready to Start Learning?
//             </h1>
//             <p className="py-4 text-white">
//               From quiz creation to performance insights—everything teachers and students need, powered by AI.
//             </p>
//             <button className="btn btn-primary rounded-full mt-4 px-4 py-4">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EndSection;

import React from "react";
import { Link } from "react-router-dom";

const EndSection = () => {
  return (
    <div className="bg-gradient-to-r from-violet-600 to-violet-800 py-20 px-6 mt-20">
      <div className="max-w-5xl mx-auto text-center text-white">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Ready to Start Learning?
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-sm md:text-base text-violet-100 max-w-2xl mx-auto">
          Create quizzes, test your knowledge, and track your progress—all in one place.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">

          <Link
            to="/signup"
            className="bg-white text-violet-700 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
          >
            Get Started
          </Link>

          <Link
            to="/features"
            className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-violet-700 transition"
          >
            Learn More
          </Link>

        </div>

      </div>
    </div>
  );
};

export default EndSection;