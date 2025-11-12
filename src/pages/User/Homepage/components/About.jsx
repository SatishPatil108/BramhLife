// src/pages/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="min-h-screen text-white ">
      <div className="text-center px-5 sm:px-8 py-14 sm:py-20 mx-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-5 sm:mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-transparent bg-clip-text">
          Our Mission
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
          At{" "}
          <span className="font-semibold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            BramhLife
          </span>
          , we believe everyone has the power to grow, heal, and transform. Our
          platform connects you with world-class coaches and programs that empower you
          to reach your highest potential.
        </p>
      </div>

      {/* Highlight Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5 sm:px-8 py-8">
        <div className="bg-white/10 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-5 hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl sm:text-2xl font-bold text-teal-400 mb-3 sm:mb-4">
            Heart
          </h3>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed">
            We put compassion and care into everything we create. Every course is
            designed with your personal growth in mind.
          </p>
        </div>

        <div className="bg-white/10 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-5 hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl sm:text-2xl font-bold text-purple-400 mb-3 sm:mb-4">
            Science
          </h3>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed">
            Our programs are backed by research and proven strategies, ensuring
            results that last and transform your daily life.
          </p>
        </div>

        <div className="bg-white/10 border border-gray-200 shadow-sm rounded-xl p-4 sm:p-5 hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl sm:text-2xl font-bold text-pink-400 mb-3 sm:mb-4">
            Results
          </h3>
          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed">
            We measure success by the transformation in your life — empowering you to
            achieve mental clarity, focus, and purpose.
          </p>
        </div>
      </div>


      {/* Story Section */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-6 sm:mb-8">
          Why We Started BramhLife
        </h2>
        <p className="text-gray-500 text-lg sm:text-xl leading-relaxed">
          Our journey began with a vision — to create a safe space where people
          can discover life-changing insights and connect with mentors who truly
          care. We’ve helped thousands find their path, break through mental
          barriers, and live their fullest lives. And we’re just getting
          started.
        </p>
      </div>

      {/* Call To Action */}
      <div className="text-center pb-25 px-5">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-5 text-black">
          Ready to Begin Your Journey?
        </h3>
        <button
          onClick={handleExploreClick}
          className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-base sm:text-lg hover:scale-110 transition-transform duration-300 shadow-lg"
        >
          Explore Our Courses
        </button>
      </div>
    </div>
  );
}

export default About;
