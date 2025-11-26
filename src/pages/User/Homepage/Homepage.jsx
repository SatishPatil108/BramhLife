import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useHomepage from "./useHomepage";
import { Users, BookOpen, Activity, ChevronDown, ArrowRight, Search } from "lucide-react";
import AutoScrollCarousel from "./AutoScrollCarousel";
import "./animation.css";
import Categories from "./components/getAllCategories/Categories";
import BannerImage from "./components/bannerImages.jsx/BannerImage";
import MusicList from "./components/getAllMusicList/MusicList";
import FAQPage from "./components/FAQsSections/FAQPage";
import SearchBarWithDatalist from "./components/searchbar/SearchBarWithDatalist";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

function Homepage() {
  const { dashboardData, loading, error, searchDetails, onSubmitSearch } = useHomepage();
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

          {/* Mobile Search Bar inside Hero */}
          <div className="md:hidden w-full max-w-sm mx-auto mt-4 z-50">
            <SearchBarWithDatalist />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center  sm:gap-6">
            <button
              onClick={() => setShowVideo(true)}
              className="px-8 mt-8 lg:mt-0 sm:px-10 py-3 sm:py-4 cursor-pointer text-white bg-gradient-to-r from-teal-400 to-blue-500 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
            >
              ▶ Watch Our Story
            </button>
          </div>
        </div>
      </section>


      {/* Banner Images Section */}
      <BannerImage />

      {/* 👨‍🏫 COACHES SECTION */}
      {allcoaches.length > 0 && (
        <section className="relative py-2 sm:py-8 px-2 sm:px-6 bg-purple-50 mx-2">
          {/* "View All" Button — fixed to top-right */}
          <button
            onClick={() => navigate('/coaches')}
            className="absolute  right-4 sm:top-8 sm:right-10 text-sm sm:text-base cursor-pointer text-purple-600 hover:text-purple-500 font-medium transition-all flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className="flex flex-col items-center flex-shrink-0 snap-center w-24 sm:w-36 md:w-44 hover:scale-95 transition-transform duration-300 "
                >
                  <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full shadow-lg border border-gray-200 overflow-hidden">
                    <img
                      src={`${BASE_URL}${coach.coach_profile_image}`}
                      alt={`Coach ${index + 1}`}
                      className="w-full h-full object-contain rounded-full cursor-pointer"
                      onClick={() => navigate(`/coach/${coach.coach_id}`)}
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

      {/* FAQ SECTION */}
      <FAQPage />

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