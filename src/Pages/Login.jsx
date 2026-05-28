import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const res = await API.post("/user/login", {
  email: data.email.trim(),
  password: data.password,
});

      toast.success("Login Successful");

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "Teacher") {
        navigate("/teacherdashboard", { replace: true });
      } else {
        navigate("/studentdashboard", { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-white px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-2xl rounded-3xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold text-violet-800">
            EduMind
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Login to access your dashboard and manage your quizzes
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-violet-800 
                         focus:border-violet-800 transition"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                Email is required
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-violet-800 
                         focus:border-violet-800 transition"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                Password is required
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-800 text-white font-semibold 
                       hover:bg-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-violet-800 font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;