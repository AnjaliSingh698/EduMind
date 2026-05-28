import React from "react";

const About = () => {
  const features = [
    {
      title: "Quiz Creation",
      desc: "Teachers can create structured quizzes with multiple questions and options, making it easy to organize assessments.",
      icon: "📝",
    },
    {
      title: "Performance Tracking",
      desc: "Monitor quiz attempts and view results instantly to understand student progress and performance.",
      icon: "📊",
    },
    {
      title: "Teacher Dashboard",
      desc: "Manage quizzes, view activity, and handle all teaching tasks from a centralized dashboard.",
      icon: "🧑‍🏫",
    },
    {
      title: "Instant Results",
      desc: "Students receive immediate scores after submitting quizzes, helping them track their learning progress.",
      icon: "⚡",
    },
  ];

  const missions = [
    {
      title: "Support Teachers",
      desc: "Provide simple tools to help teachers create and manage quizzes efficiently.",
      icon: "👩‍🏫",
    },
    {
      title: "Improve Learning",
      desc: "Make learning interactive through quizzes and instant feedback.",
      icon: "🎯",
    },
    {
      title: "Simplify Process",
      desc: "Streamline quiz creation, attempts, and result tracking for a smooth experience.",
      icon: "⏱️",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 min-h-screen px-6 py-16">

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mt-10">
        <span className="inline-block px-4 py-1 text-sm font-medium bg-violet-100 text-violet-800 rounded-full">
          Quiz Management Platform
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mt-6">
          Welcome to <span className="text-violet-800">EduMind</span>
        </h1>

        <p className="text-gray-600 mt-4 leading-relaxed">
          A modern platform designed to help teachers create quizzes and students attempt them while tracking performance in a simple and efficient way.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Mission
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {missions.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <div className="max-w-3xl mx-auto bg-violet-50 border border-violet-100 rounded-2xl p-10 shadow-sm">
          <h3 className="text-2xl font-semibold">
            Start using EduMind today 🚀
          </h3>
          <p className="text-gray-600 mt-2">
            This is a full-stack quiz management system built using the MERN stack. It allows teachers to create and manage quizzes, while students can attempt them and view their results in real time. The platform focuses on simplicity, performance, and a smooth user experience.
          </p>
        </div>
      </div>

    </div>
  );
};

export default About;