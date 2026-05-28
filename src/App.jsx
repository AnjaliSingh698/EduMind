import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import PublicLayout from "./Pages/PublicLayout";
import PrivateLayout from "./Pages/PrivateLayout";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Features from "./Components/Features";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Contact from "./Pages/Contact";

// Teacher Dashboard
import TeacherDashboard from "./Pages/TeacherDashboard";
import CreateQuiz from "./T_Dashboard/CreateQuiz";
import MyQuizzes from "./T_Dashboard/MyQuizzes";
import ViewQuiz from "./T_Dashboard/ViewQuiz";
import QuizResultsByQuiz from "./T_Dashboard/QuizResultsByQuiz";
import QuizResults from "./T_Dashboard/QuizResults";
import MyDrafts from "./T_Dashboard/MyDraft";

// Student Dashboard
import StudentDashboard from "./Pages/StudentDashboard";
import AllQuizzes from "./S_Dashboard/AllQuizzes";
import AttemptQuizPage from "./S_Dashboard/AttemptQuizPage";
import Results from "./S_Dashboard/Results";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES (Navbar + Footer visible) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* DASHBOARD ROUTES (NO Navbar/Footer) */}
        <Route element={<PrivateLayout />}>

          {/* Teacher */}
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/teacher/drafts" element={<MyDrafts />} />
          <Route path="/myquizzes" element={<MyQuizzes />} />
          <Route path="/quiz/:id" element={<ViewQuiz />} />
          <Route path="/quiz-results/:quizId" element={<QuizResultsByQuiz />} />
          <Route path="/teacher/results" element={<QuizResults />} />

          {/* Student */}
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/student/quizzes" element={<AllQuizzes />} />
          <Route path="/student/attempt/:id" element={<AttemptQuizPage />} />
          <Route path="/student/results" element={<Results />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;