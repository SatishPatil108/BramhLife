import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useHomepage from "./useHomepage";
import { Users, BookOpen, Activity, ChevronDown } from "lucide-react";
import coach1 from "@/assets/coach1.png";
import AutoScrollCarousel from "./AutoScrollCarousel";
import "./animation.css";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="rounded-3xl p-8 bg-white/70 backdrop-blur-md shadow-md hover:shadow-xl border border-gray-200 transition-all hover:-translate-y-1">
    <div
      className={`p-4 rounded-2xl inline-flex items-center justify-center ${color.bg}`}
    >
      <Icon size={28} className={color.text} />
    </div>
    <p className="mt-4 text-sm font-medium text-gray-600 uppercase tracking-wide">
      {title}
    </p>
    <p className="mt-2 text-4xl font-extrabold text-gray-800">{value}</p>
  </div>
);

function Homepage() {
  const { dashboardData, loading, error, FAQs, allCoursesFeedback } = useHomepage();
  const [showVideo, setShowVideo] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const thumbnails = dashboardData?.video_thumbnails || [];
  let coachImages = dashboardData?.coach_profile_images || [];
  coachImages = coachImages.map((coachImage) => `${BASE_URL}${coachImage}`);

  // 📱 Detect screen size for responsive animation logic
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // check on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Animation only if thresholds are met
  const shouldAnimateThumbnails = isMobile ? thumbnails.length > 1 : thumbnails.length > 3;
  const shouldAnimateCoaches = isMobile ? coachImages.length > 1 : coachImages.length > 5;

  return (
    <div className="min-h-svh flex flex-col text-gray-900 font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.coverr.co/videos/coverr-a-person-meditating-while-listening-to-music-4723/1080p.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="px-10 text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 animate-fadeIn">
            Unlock Your Limitless Potential
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 animate-slideUp font-light">
            Step into a world of transformation. Discover programs designed to
            awaken your mind, elevate your spirit, and master every dimension of
            your life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              to="/courses"
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
            >
              Explore Our Programs
            </Link>
            <button
              onClick={() => setShowVideo(true)}
              className="px-10 py-4 text-white bg-gradient-to-r from-teal-400 to-blue-500 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
            >
              ▶ Watch Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Video Thumbnails */}
      {thumbnails.length > 0 && (
        <section className="py-20  bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl mt-16">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Forge Lasting Transformations
            </h2>
            <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-600 font-light">
              Access immersive micro-coaching sessions, designed by experts to
              elevate your mind, body, and soul.
            </p>
          </div>

          <div className="relative overflow-hidden w-full group">
            <div
              className={`flex gap-8 w-max ${shouldAnimateThumbnails
                  ? "animate-scroll-horizontal group-hover:[animation-play-state:paused]"
                  : ""
                }`}
            >
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[22rem] h-72 rounded-3xl shadow-sm border border-gray-200 overflow-hidden group/item"
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
      )}

      {/* Coaches Section */}
      {coachImages.length > 0 && (
        <section className="py-20 lg:p-2 bg-gradient-to-b from-white to-purple-50">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Meet Our Guiding Masters
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 font-light">
              Learn from innovators and thought leaders dedicated to your
              success.
            </p>
          </div>

          <div className="relative w-full overflow-x-hidden group">
            <div
              className={`flex min-w-[200%] gap-6 ${shouldAnimateCoaches
                  ? "animate-scroll-horizontal group-hover:[animation-play-state:paused]"
                  : ""
                }`}
            >
              {coachImages.map((img, index) => {
                const imgUrl = img.startsWith("http")
                  ? img
                  : `${BASE_URL}${img}`;
                return (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-56 h-56 rounded-full shadow-lg border border-gray-200 hover:scale-95 transition-transform duration-300"
                  >
                    <img
                      src={imgUrl}
                      alt={`Coach ${index + 1}`}
                      className="w-full h-full object-fit rounded-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Other sections remain unchanged */}
      {/* FAQ Section */}
      {FAQs && FAQs.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-b from-pink-50 to-purple-50">
          <div className="container mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600 font-light">
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
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transform transition-transform ${openFAQ === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Begin Your Transformation?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light text-white/90">
          Your next big breakthrough is just a few clicks away. Join our global
          community and start shaping your future today.
        </p>
        <Link
          to="/register"
          className="px-12 py-5 bg-white text-gray-900 rounded-full font-bold shadow-xl transition-transform hover:scale-105 hover:shadow-2xl"
        >
          Begin Your Journey
        </Link>
      </section>
    </div>
  );
}

export default Homepage;
