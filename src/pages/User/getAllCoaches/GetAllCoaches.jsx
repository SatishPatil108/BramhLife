import React, { useState } from "react";
import useGetAllCoaches from "./useGetAllCoaches";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'
import Pagination from "@/components/Pagination/Pagination";

const GetAllCoaches = () => {
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 1;

  const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;
  const { coachesDetails, isLoading, error } = useGetAllCoaches(pageNo, pageSize);
  const coaches = coachesDetails.coaches;

  const navigate = useNavigate();
   

  if (isLoading)
    return <p className="text-center py-10 text-lg">Loading coaches...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">
        Error: {error.message}
      </p>
    );

  return (
    <div className="bg-white min-h-screen py-8 px-6 sm:px-8">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Masters & Guides
      </h2>

      {/* Coaches Section */}
      {coaches.length === 0 ? (
        <p className="text-center text-gray-600">No coaches found.</p>
      ) : (
        <div className="flex flex-col gap-8 sm:gap-10">
          {coaches.map((coach, index) => {
            const isEven = index % 2 === 1; // swap for even items

            return (
              <div
                key={coach.coach_id}
                className={`flex items-center justify-between flex-col sm:flex-row 
                 rounded-3xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 
                 ${isEven ? "sm:flex-row-reverse flex-row-reverse bg-purple-50" : "flex-row bg-pink-50"}`}
              >
                {/* Image Section */}
                <div className="w-1/2 flex justify-center items-center p-6 sm:py-10">
                  <img
                    src={`${BASE_URL}${coach.profile_image_url}`}
                    alt={coach.name}
                    className="w-36 h-36 sm:w-64 sm:h-64 object-fit rounded-full shadow-md"
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = "https://cdn.pixabay.com/photo/2024/02/21/07/53/meeting-8586982_1280.jpg";
                    }}
                  />
                </div>

                {/* Text Section */}
                <div className="w-1/2 px-2 sm:px-8 pb-6 sm:pb-10 text-center sm:text-left flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-3xl font-bold text-gray-800 mt-4 sm:mb-4 mb-2">
                      {coach.name}
                    </h3>

                    {/* Bio text (truncated only on small screens) */}
                    <p
                      className="text-gray-600 text-left leading-relaxed text-sm sm:text-base mb-4 overflow-hidden [display:-webkit-box]  [-webkit-line-clamp:3] 
                      [-webkit-box-orient:vertical] sm:[-webkit-line-clamp:unset] sm:overflow-visible"
                    >
                      {coach.bio ||
                        `${coach.name} is an experienced coach who guides individuals toward success with years of expertise and a compassionate approach.`}
                    </p>
                  </div>

                  <div className={`flex ${isEven ? "justify-center sm:justify-start" : "justify-center sm:justify-end"}`}>
                    <button onClick={() => navigate(`/coach/${coach.coach_id}`)} className="mt-2 text-sm sm:text-base text-purple-600 font-semibold cursor-pointer hover:text-purple-400 flex items-center gap-1 transition-all">
                      View Profile
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {/* Pagination */}
      <Pagination
        currentPage={coachesDetails.current_page}
        totalPages={coachesDetails.total_pages}
        onPageChange={(page) => setPageNo(page)}
      />

    </div>
  );
};

export default GetAllCoaches;
