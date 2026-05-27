// import React from "react";

// const Features = () => {
//   const features = [
//     {
//       title: "AI Quiz Generation",
//       description:
//         "Describe your topic, and our AI creates complete quizzes with questions, options, and explanations instantly.",
//       image: "https://media.lordicon.com/icons/wired/gradient/2512-artificial-intelligence-ai-alt.svg",
//     },
//     {
//       title: "Teacher Dashboard",
//       description:
//         "Track student performance, manage quizzes, and get insights into learning progress with powerful analytics.",
//       image: "https://cdn-icons-png.flaticon.com/256/11327/11327935.png",
//     },
//     {
//       title: "Student Experience",
//       description:
//         "Students join with a simple code, take quizzes on any device, and get instant feedback with detailed explanations.",
//       image: "https://cdn-icons-png.flaticon.com/512/15710/15710362.png",
//     },
//   ];

//   return (
//     <div className="bg-lightBg py-20 px-6">

//       {/* HEADER */}
//       <div className="text-center max-w-3xl mx-auto">
//         <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">
//           Everything you need to{" "}
//           <span className="text-primary">teach smarter</span>
//         </h1>

//         <p className="text-gray-600 mt-4">
//           Our platform combines AI with intuitive design to make education effortless.
//         </p>
//       </div>

//       {/* FEATURE CARDS */}
//       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-14">
//         {features.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 text-center"
//           >
//             <div className="flex justify-center mb-6">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="w-20 h-20 object-contain"
//               />
//             </div>

//             <h2 className="text-lg font-semibold text-gray-900 mb-2">
//               {item.title}
//             </h2>

//             <p className="text-gray-600 text-sm">
//               {item.description}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* HOW IT WORKS */}
//       <div className="mt-32 max-w-6xl mx-auto">

//         <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900">
//           How it <span className="text-primary">works</span>
//         </h2>

//         <p className="text-gray-600 text-center mt-4 mb-16">
//           From sign-up to results in four simple steps.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">

//           {[
//             { icon: "✍️", step: "STEP 1", title: "Sign Up", desc: "Create your account as a teacher or student in seconds." },
//             { icon: "🧠", step: "STEP 2", title: "Generate Quiz", desc: "Teachers create quizzes instantly using AI." },
//             { icon: "🔗", step: "STEP 3", title: "Assign Quiz", desc: "Share quiz code with students to join instantly." },
//             { icon: "📊", step: "STEP 4", title: "Track Results", desc: "Analyze performance and improve learning." },
//           ].map((step, i) => (
//             <div key={i} className="flex flex-col items-center">

//               <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-purple-100 mb-4 text-2xl">
//                 {step.icon}
//               </div>

//               <p className="text-sm text-primary font-semibold">
//                 {step.step}
//               </p>

//               <h3 className="text-lg font-bold text-gray-900 mt-1">
//                 {step.title}
//               </h3>

//               <p className="text-gray-600 mt-2 text-sm">
//                 {step.desc}
//               </p>

//             </div>
//           ))}

//         </div>
//       </div>

//     </div>
//   );
// };

// export default Features;

import React from "react";

const Features = () => {
  const features = [
    {
      title: "Quiz Creation",
      description:
        "Teachers can create quizzes with multiple questions and options, making it easy to organize and manage assessments.",
      image: "https://cdn-icons-png.freepik.com/512/17898/17898228.png",
    },
    {
      title: "Teacher Dashboard",
      description:
        "Manage quizzes, monitor student attempts, and keep track of overall activity from a dedicated dashboard.",
      image: "https://cdn-icons-png.flaticon.com/256/11327/11327935.png",
    },
    {
      title: "Student Experience",
      description:
        "Students can attempt quizzes, submit answers, and instantly view their results and performance.",
      image: "https://cdn-icons-png.flaticon.com/512/15710/15710362.png",
    },
  ];

  return (
    <div className="bg-lightBg py-20 px-6">

      {/* HEADER */}
      <div className="text-center mt-15 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
          Create, manage, and track {" "}
          <span className="text-violet-800">quizzes with ease</span>
        </h1>

        <p className="text-gray-600 mt-4">
          A simple and efficient platform for creating, attempting, and tracking quizzes.
        </p>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-14">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 text-center"
          >
            <div className="flex justify-center mb-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h2>

            <p className="text-gray-600 text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="mt-32 max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900">
          How it <span className="text-violet-800">works</span>
        </h2>

        <p className="text-gray-600 text-center mt-4 mb-16">
          From sign-up to results in a few simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">

          {[
            { icon: "✍️", step: "STEP 1", title: "Sign Up", desc: "Create an account as a teacher or student." },
            { icon: "➕", step: "STEP 2", title: "Create Quiz", desc: "Teachers add quizzes with questions and options." },
            { icon: "🎯", step: "STEP 3", title: "Attempt Quiz", desc: "Students take quizzes assigned to them." },
            { icon: "📊", step: "STEP 4", title: "View Results", desc: "Check scores and track performance instantly." },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">

              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-violet-100 mb-4 text-2xl">
                {step.icon}
              </div>

              <p className="text-sm text-primary font-semibold">
                {step.step}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mt-1">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                {step.desc}
              </p>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Features;