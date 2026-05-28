import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import API from "../API";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("SIGNUP CLICKED");
  try {
    const userInfo = {
      fullname: data.fullname.trim(),
      email: data.email.trim(),
      password: data.password,
      role: data.role,
    };

    const res = await API.post("/user/signup",
      userInfo
    );

    toast.success("Signup Successful");

    const user = res.data.user;

    localStorage.setItem("user", JSON.stringify(user));

    if (user.role === "Teacher") {
      navigate("/teacherdashboard", { replace: true });
    } else {
      navigate("/studentdashboard", { replace: true });
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white px-4">

      {/* Card */}
      <div className="w-full mt-20 max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-violet-800">
            EduMind
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:border-indigo-500 transition"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500 mt-1">
                Full name is required
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:border-indigo-500 transition"
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
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:border-indigo-500 transition"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                Password is required
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-800 focus:border-violet-800 transition"
              {...register("role", { required: true })}
            >
              <option value="">Select your role</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>

            {errors.role && (
              <p className="text-sm text-red-500 mt-1">
                Role is required
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-800 text-white font-semibold hover:bg-violet-700 transition shadow-md"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
  onClick={() => navigate("/login")}
  className="text-violet-800 cursor-pointer hover:underline"
>
  Login
</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

