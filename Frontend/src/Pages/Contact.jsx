import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      if (res.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 px-6 py-16">

      <div className="max-w-6xl mx-auto mt-10">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Get in Touch 💬
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Questions about quizzes? Feedback? We’re all ears.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid md:grid-cols-2 gap-10 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8">

          {/* Left Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-2xl font-bold text-violet-800">
              Let’s talk about your learning journey 🚀
            </h2>

            <p className="text-gray-600">
              Whether you're stuck on a quiz, want new features, or just want to say hi —
              drop a message and we’ll get back to you.
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-3">
                <span>📧</span>
                <span>support@quizapp.com</span>
              </div>

              <div className="flex items-center gap-3">
                <span>👩‍💻</span>
                <span>Friendly Support Team</span>
              </div>

              <div className="flex items-center gap-3">
                <span>⚡</span>
                <span>Replies within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            />

            {/* Message */}
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            ></textarea>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-800 text-white py-3 rounded-lg font-semibold hover:bg-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;