// src/pages/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      {/* Hero Section */}
      <div className="text-center px-6 py-10">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-teal-400 to-purple-400 text-transparent bg-clip-text">
          Our Mission
        </h1>
        <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-300">
          At <span className="font-semibold text-white">Bramhmind</span>, we
          believe everyone has the power to grow, heal, and transform. Our
          platform connects you with world-class coaches and programs that
          empower you to reach your highest potential.
        </p>
      </div>

      {/* Highlight Section */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-10">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:scale-105 transition transform">
          <h3 className="text-2xl font-bold text-teal-400 mb-4">Heart</h3>
          <p className="text-gray-300 text-sm">
            We put compassion and care into everything we create. Every course
            is designed with your personal growth in mind.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:scale-105 transition transform">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">Science</h3>
          <p className="text-gray-300 text-sm">
            Our programs are backed by research and proven strategies, ensuring
            results that last and transform your daily life.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:scale-105 transition transform">
          <h3 className="text-2xl font-bold text-pink-400 mb-4">Results</h3>
          <p className="text-gray-300 text-sm">
            We measure success by the transformation in your life — empowering
            you to achieve mental clarity, focus, and purpose.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-teal-300 mb-6">
          Why We Started Bramhmind
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Our journey began with a vision — to create a safe space where people
          can discover life-changing insights and connect with mentors who truly
          care. We’ve helped thousands find their path, break through mental
          barriers, and live their fullest lives. And we’re just getting
          started.
        </p>
      </div>

      {/* Call To Action */}
      <div className="text-center pb-20">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to Begin Your Journey?
        </h3>
        <button
          onClick={handleExploreClick}
          className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full font-bold hover:scale-110 transition transform"
        >
          Explore Our Courses
        </button>
      </div>
    </div>
  );
}

export default About;
