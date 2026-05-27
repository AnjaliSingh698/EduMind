// import React from "react"; 

// const Cards = () => {

//   const cards = [
//     {
//       title: "Adaptive Quizzes",
//       description: "Questions that adapt to student level in real-time.",
//       icon: "🧠",
//     },
//     {
//       title: "Progress Tracking",
//       description: "Track performance with analytics and reports.",
//       icon: "📊",
//     },
//     {
//       title: "AI Learning",
//       description: "Personalized study plans powered by AI.",
//       icon: "🤖",
//     },
//     {
//       title: "Teacher Dashboard",
//       description: "Teachers can create and manage quizzes easily.",
//       icon: "👩‍🏫",
//     },
//     {
//       title: "Instant Feedback",
//       description: "Students get real-time answers and explanations.",
//       icon: "⚡",
//     },
//     {
//       title: "Secure Platform",
//       description: "Your data is protected with strong security.",
//       icon: "🔒",
//     },
//   ];

//   return (
//     <div className="bg-lightBg py-20 px-6">

//       {/* Heading */}
//       <div className="text-center max-w-3xl mx-auto">
//         <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
//           Why <span className="text-primary">EduMind?</span>
//         </h1>
//         <p className="mt-4 text-gray-600">
//           Everything you need to enhance learning with AI-powered tools.
//         </p>
//       </div>

//       {/* Cards Grid */}
//       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-14">

//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
//           >

//             {/* Icon */}
//             <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 text-xl mb-4">
//               {card.icon}
//             </div>

//             {/* Title */}
//             <h2 className="text-lg font-semibold text-gray-900 mb-2">
//               {card.title}
//             </h2>

//             {/* Description */}
//             <p className="text-gray-600 text-sm">
//               {card.description}
//             </p>

//           </div>
//         ))}

//       </div>

//     </div>
//   );
// };

// export default Cards;

import React from "react";

const Cards = () => {
  const cards = [
    {
      title: "Quiz Creation",
      description: "Teachers can easily create and manage quizzes with multiple questions.",
      icon: "📝",
    },
    {
      title: "Student Dashboard",
      description: "Students can view assigned quizzes and attempt them seamlessly.",
      icon: "👨‍🎓",
    },
    {
      title: "Real-time Results",
      description: "Get instant scores and performance after submitting quizzes.",
      icon: "📊",
    },
    {
      title: "Performance Tracking",
      description: "Track attempts, scores, and overall progress over time.",
      icon: "📈",
    },
    {
      title: "Role-based Access",
      description: "Separate dashboards and features for teachers and students.",
      icon: "🔐",
    },
    {
      title: "Responsive Design",
      description: "Optimized for all devices with a clean and modern interface.",
      icon: "💻",
    },
  ];

  return (
    <div className="bg-lightBg py-20 px-6">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Why <span className="text-violet-800">EduMind?</span>
        </h1>
        <p className="mt-4 text-gray-600">
          A complete quiz management system designed for both teachers and students.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-14">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm 
                       hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >

            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-xl 
                            bg-violet-100 text-2xl mb-4 
                            group-hover:bg-violet-700 group-hover:text-white transition-all duration-300">
              {card.icon}
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-violet-800 transition">
              {card.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm">
              {card.description}
            </p>

            {/* Hover underline effect */}
            <div className="mt-4 h-1 w-0 bg-violet-700 rounded-full group-hover:w-12 transition-all duration-300"></div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Cards;