// import React from "react";

// const Hero = () => {
//   return (
//     <div className="min-h-screen bg-lightBg flex flex-col items-center justify-center px-6 text-center">

//       <div className="max-w-4xl mt-10">

//         {/* Badge */}
//         <span className="bg-purple-100 text-primary px-4 py-1 rounded-full text-sm font-medium">
//           AI-Powered Learning Platform
//         </span>

//         {/* Heading */}
//         <h1 className="mt-6 text-4xl md:text-7xl font-extrabold leading-tight text-gray-900">
//           Learn Smarter,
//           <br />
//           <span className="text-primary">Grow Faster.</span>
//         </h1>

//         {/* Description */}
//         <p className="mt-6 text-lg md:text-xl text-gray-600">
//           Create quizzes, track progress, and enhance learning with an AI-powered
//           platform built for both teachers and students.
//         </p>

//         {/* Stats (Optional but matches your screenshot) */}
//         <div className="mt-12 flex justify-center gap-6 flex-wrap">
//           {["50+ Courses", "3+ AI Quizzes", "1K+ Students", "500+ Certificates"].map((item, i) => (
//             <div key={i} className="bg-white px-6 py-3 rounded-xl shadow-sm text-gray-700">
//               {item}
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from "react";
import heroImg from "../assets/quiz-hero.png";

const stats = [
  { label: "Quizzes Created", value: "50+", icon: "📝" },
  { label: "Active Students", value: "1K+", icon: "👨‍🎓" },
  { label: "Attempts Made", value: "3K+", icon: "📊" },
  { label: "Results Generated", value: "500+", icon: "📈" },
];

const Hero = () => {
  return (
    <div className="min-h-screen bg-lightBg flex items-center px-6 md:px-12">
      
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div className="text-left max-w-xl">
  {/* Badge */}
  <span className="inline-block bg-violet-100 text-violet-800 mt-10 px-4 py-1 rounded-full text-sm font-medium">
    Quiz Management Platform
  </span>

  {/* Heading */}
  <h1 className="mt-2 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-gray-900">
    Learn Smarter,
    <br />
    <span className="text-violet-800">Grow Faster.</span>
  </h1>

  {/* Description */}
  <p className="mt-3 text-lg md:text-xl text-gray-600 leading-tight">
    A full-stack quiz platform where teachers can create and manage quizzes,
    and students can attempt them while tracking their performance in real time.
  </p>

  {/* Stats */}
  <div className="mt-10 grid grid-cols-2 gap-4">
    {stats.map((item, i) => (
      <div
        key={i}
        className="bg-white px-5 py-4 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3 hover:shadow-md transition"
      >
        <span className="text-2xl">{item.icon}</span>
        <div>
          <p className="font-semibold">{item.value}</p>
          <p className="text-sm text-gray-500">{item.label}</p>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center md:justify-end">
          {/* <img
  src={heroImg}
  alt="Quiz App UI"
  className="w-full max-w-[800px] md:max-w-[850px] lg:max-w-[950px] mt-18 drop-shadow-2xl"
/> */}
<img
  src={heroImg}
  alt="Quiz App UI"
  className="w-full max-w-[600px] md:max-w-[650px] lg:max-w-[700px] h-auto object-contain drop-shadow-xl"
/>
        </div>

      </div>
    </div>
  );
};

export default Hero;