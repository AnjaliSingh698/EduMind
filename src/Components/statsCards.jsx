import React from "react";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Quizzes",
      value: 0
    },
    {
      title: "Published",
      value: 0
    },
    {
      title: "Students",
      value: 0
    },
    {
      title: "Avg Score",
      value: "0%"
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="p-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white shadow">
          <h3 className="text-white">{stat.title}</h3>
          <p className="text-xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;