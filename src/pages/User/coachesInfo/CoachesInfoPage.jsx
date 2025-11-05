import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useCoachesInfoPage from "./useCoachesInfoPage";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachesInfoPage = ({ coachId }) => {
  const { subdomainId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { videos, loading, error } = useCoachesInfoPage(subdomainId, coachId);
  const subdomainName = location.state?.subdomain_name || "Programs";

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 text-lg text-gray-700">
        Loading programs...
      </div>
    );

  if (!loading && error)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-pink-50 to-purple-50">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          {subdomainName}
        </h1>

        {error === "No records found" ? (
          <>
            <p className="mb-3 text-xl text-gray-600">
              No courses available currently.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="text-white bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-md font-semibold hover:from-pink-400 hover:to-purple-400 transition"
            >
              ← Go Back
            </button>
          </>
        ) : (
          <p className="text-red-600 mt-2">
            {error.message ? error.message : error}
          </p>
        )}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 text-gray-900 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r">
          {subdomainName}
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mb-8">
          {videos.map((video) => (
            <div
              key={video.video_id}
              onClick={() => navigate(`/coach-details/${video.video_id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer border border-gray-200 flex flex-col max-w-sm w-full"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-44 sm:h-52 bg-black rounded-t-xl overflow-hidden">
                <img
                  src={`${BASE_URL}${video.thumbnail_url}`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                  <h2 className="text-lg font-bold text-white">{video.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={`${BASE_URL}${video.coach_profile_image}`}
                    alt={video.coach_name}
                    className="w-12 h-12 rounded-full object-contain border-2 border-pink-400"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {video.coach_name}
                    </h3>
                    <p className="text-sm text-gray-500">Coach</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mt-1 line-clamp-3">
                  {video.description}
                </p>

                <div className="mt-3">
                  <button className="px-3 py-2 text-sm font-semibold text-white rounded-md bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoachesInfoPage;
