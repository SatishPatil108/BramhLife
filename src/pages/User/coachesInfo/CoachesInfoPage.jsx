import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import useCoachesInfoPage from "./useCoachesInfoPage";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachesInfoPage = () => {
  const { subdomainId } = useParams();
  const navigate = useNavigate();
  const { videos, loading, error } = useCoachesInfoPage(subdomainId);

  if (loading) return <p className="text-center py-10">Loading programs...</p>;
  {/* Error States */ }
  if (!loading && error) return (
    <>
      {error === "No records found" ? (
        <div className="text-center text-gray-600 mb-12">
          <p className="mb-2">No Course available currently.</p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            ← Go Back
          </button>
        </div>
      ) : (
        <div className="text-center text-red-600 mb-12">
          <p>{error.message ? error.message : error}</p>
        </div>
      )}
    </>
  )

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-10 text-center">Programs</h1>

        <div className="space-y-12">
          {videos.map((video) => (
            <div
              key={video.video_id}
              className="flex flex-col md:flex-row bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/coach-details/${video.video_id}`)}
            >

              <div className="md:w-1/2 p-6 flex flex-col justify-center">
                <h2 className="text-2xl font-bold">{video.title}</h2>
                <p className="text-lg text-gray-600 mt-1">{video.coach_name}</p>
                <p className="mt-4 text-gray-700 text-base whitespace-pre-line">
                  {video.description}
                </p>
              </div>


              <div className="md:w-1/2 p-6 flex items-center space-x-4">
                <img
                  src={`${BASE_URL}${video.coach_profile_image}`}
                  alt={video.coach_name}
                  className="w-32 h-60 object-cover rounded-xl shadow"
                />
                <img
                  src={`${BASE_URL}${video.thumbnail_url}`}
                  alt={video.title}
                  className="flex-1 h-60 rounded-xl shadow object-contain bg-black"
                />
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoachesInfoPage;
