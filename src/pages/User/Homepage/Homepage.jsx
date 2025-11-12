import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useHomepage from "./useHomepage";
import { Users, BookOpen, Activity, ChevronDown, ArrowRight } from "lucide-react";
import AutoScrollCarousel from "./AutoScrollCarousel";
import "./animation.css";
import Categories from "./components/getAllCategories/Categories";
import BannerImage from "./components/bannerImages.jsx/BannerImage";
import MusicList from "./components/getAllMusicList/MusicList";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

function Homepage() {
  const { dashboardData, loading, error, FAQs } = useHomepage();
  const [showVideo, setShowVideo] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const thumbnails = dashboardData?.coaches || [];
  const allcoaches = dashboardData?.coaches || [];
  const navigate = useNavigate();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldAnimateThumbnails = isMobile ? thumbnails.length > 1 : thumbnails.length > 3;

  return (
    <div className="min-h-screen flex flex-col text-gray-900 font-sans overflow-hidden">
      {/* 🌅 HERO SECTION */}
      <section className="relative flex items-center justify-center min-h-[90vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Optional dark overlay to improve text contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 animate-fadeIn">
            Unlock Your Limitless Potential
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto mb-10 animate-slideUp font-light">
            Step into a world of transformation. Discover programs designed to awaken your mind, elevate your spirit, and master every dimension of your life.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link
              to="/courses"
              className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
            >
              Explore Our Programs
            </Link>
            <button
              onClick={() => setShowVideo(true)}
              className="px-8 sm:px-10 py-3 sm:py-4 cursor-pointer text-white bg-gradient-to-r from-teal-400 to-blue-500 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
            >
              ▶ Watch Our Story
            </button>
          </div>

          {/* Responsive Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 w-full">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-200 text-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 w-[90%] sm:w-[70%] md:w-[50%] rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-400 text-base sm:text-lg transition-all duration-300"
            />
            <button
              type="button"
              className="font-bold bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg text-white text-base sm:text-lg hover:opacity-80 active:scale-95 transition-all duration-300 w-[40%] sm:w-28 md:w-32 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </section>


      {/* 🎥 VIDEO THUMBNAILS */}
      {/* {thumbnails.length > 0 && (
        <section className="py-16 sm:py-20 bg-gradient-to-b from-purple-50 to-pink-50 mt-10 sm:mt-16 rounded-3xl">
          <div className="container mx-auto px-4 text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Forge Lasting Transformations
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-600 font-light">
              Access immersive micro-coaching sessions designed by experts to elevate your mind, body, and soul.
            </p>
          </div>

          <div className="relative overflow-hidden w-full group">
            <div
              className={`flex gap-4 sm:gap-8 w-max ${shouldAnimateThumbnails
                ? "animate-scroll-horizontal group-hover:[animation-play-state:paused]"
                : ""
                }`}
            >
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-64 sm:w-80 md:w-[22rem] h-48 sm:h-60 md:h-72 rounded-3xl shadow-sm border border-gray-200 overflow-hidden group/item"
                >
                  <img
                    src={`${BASE_URL}${thumb}`}
                    alt={`Video Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300">
                    <span className="text-white text-3xl">▶</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}


      {/* Banner Images Section */}
      <BannerImage />

      {/* 👨‍🏫 COACHES SECTION */}
      {allcoaches.length > 0 && (
        <section className="relative py-2 sm:py-8 px-2 sm:px-6 bg-gradient-to-b from-pink-50 to-purple-50 mx-2">
          {/* "View All" Button — fixed to top-right */}
          <button
            onClick={() => navigate('/coach-profile')}
            className="absolute  right-4 sm:top-8 sm:right-10 text-sm sm:text-base cursor-pointer text-purple-600 hover:text-purple-500 font-medium transition-all flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5"/>
          </button>

          <div className="container mx-auto text-left mb-12 sm:mb-16 px-4">
            <h2 className="text-xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 bg-clip-text font-extrabold text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Masters & Guides 
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl  text-gray-600 font-light">
              Learn from innovators and thought leaders dedicated to your success.
            </p>
          </div>

          <div className="relative w-full overflow-x-auto scroll-smooth scrollbar-hide">
            <div className="flex space-x-4 sm:space-x-6 px-4 py-4 snap-x snap-mandatory">
              {allcoaches.map((coach, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center flex-shrink-0 snap-center w-24 sm:w-36 md:w-44 hover:scale-95 transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full shadow-lg border border-gray-200 overflow-hidden">
                    <img
                      src={`${BASE_URL}${coach.coach_profile_image}`}
                      alt={`Coach ${index + 1}`}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className="mt-3 text-gray-700 text-xs sm:text-sm md:text-base font-medium text-center">
                    {coach.coach_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Categories Section */}
      <Categories />

      {/* Meditation Audio List */}
      <MusicList />

      {/* ❓ FAQ SECTION */}
      {FAQs && FAQs.length > 0 && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-pink-50 to-purple-50">
          <div className="container mx-auto text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-600 font-light">
              Find answers to common questions about our courses and coaches.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transform transition-transform ${openFAQ === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600 text-sm sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🚀 CTA SECTION */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center mb-15 lg:mb-0">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Ready to Begin Your Transformation?
        </h2>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 font-light text-white/90">
          Your next big breakthrough is just a few clicks away. Join our global
          community and start shaping your future today.
        </p>
        <Link
          to="/register"
          className="px-8 sm:px-12 py-4 sm:py-5 bg-white text-gray-900 rounded-full font-bold shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
        >
          Begin Your Journey
        </Link>
      </section>
    </div>
  );
}

export default Homepage;