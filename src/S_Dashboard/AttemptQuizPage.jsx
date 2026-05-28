import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../API";
import Sidebar from "../S_Dashboard/Sidebar";
import toast from "react-hot-toast";

const AttemptQuizPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // FORMAT TIME
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // INITIAL LOAD
  useEffect(() => {
    const init = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?._id) return;

        // check attempt
        const res = await API.get(`/student/results/${user._id}`);
        const already = res.data.find((r) => r.quiz._id === id);

        if (already) {
          toast.error("You already attempted this quiz");
          navigate("/student/quizzes");
          return;
        }

        // fetch quiz
        const quizRes = await API.get(`/quiz/${id}`);
        setQuiz(quizRes.data);

        //  set timer
        setTimeLeft(quizRes.data.timeLimit * 60);

      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, [id, navigate]);

  // TIMER LOGIC
  useEffect(() => {
    if (!quiz || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quiz]);

  //  SELECT ANSWER
  const handleSelect = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?._id) {
        toast.error("User not logged in");
        return;
      }

      const res = await API.post("/student/submit", {
        quizId: id,
        answers,
        studentId: user._id,
      });

      navigate("/student/results", {
        state: {
          score: res.data.score,
          total: quiz.questions.length,
        },
      });

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Error submitting quiz");
    }
  };

  //  LOADING UI
  if (!quiz) {
    return (
      <div className="flex bg-gray-50 mt-15 min-h-screen">
        <Sidebar />
        <div className="ml-64 w-full p-6">
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="ml-64 w-full p-6">

        {/* HEADER + TIMER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{quiz.title}</h2>

          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold">
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>

        {/* PROGRESS */}
        <p className="mb-6 text-gray-600">
          Question {answers.filter(a => a !== undefined).length} / {quiz.questions.length}
        </p>

        {/* QUESTIONS */}
        {quiz.questions.map((q, i) => (
          <div key={i} className="bg-white p-5 mb-4 rounded shadow">
            <h3 className="font-semibold mb-3">{q.question}</h3>

            {q.option.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(i, idx)}
                className={`block w-full text-left p-2 mb-2 rounded border transition ${
                  answers[i] === idx
                    ? "bg-blue-500 text-white border-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded text-white bg-green-600 hover:bg-green-700"
        >
          Submit Quiz
        </button>

      </div>
    </div>
  );
};

export default AttemptQuizPage;