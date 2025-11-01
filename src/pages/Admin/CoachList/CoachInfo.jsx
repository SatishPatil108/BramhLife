import React from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachInfo = ({ coach }) => {
  if (!coach)
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No coach selected
      </div>
    );

  return (
    <div className="p-6 flex flex-col items-center space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-3xl mx-auto transition-colors duration-300">
      {/* Profile Picture & Name */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow-xl bg-gray-100 dark:bg-gray-700 flex justify-center items-center">
          <img
            src={
              coach.profile_image_url
                ? `${BASE_URL}${coach.profile_image_url}`
                : "/default-avatar.png"
            }
            alt={coach.name}
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
          {coach.name}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
          {coach.professional_title}
        </p>
      </div>

      {/* Contact & Experience */}
      <div className="w-full grid mobile:grid-cols-1 desktop:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner">
          <p className="font-semibold text-gray-700 dark:text-gray-200">Email</p>
          <p className="text-gray-600 dark:text-gray-300 break-all">
            {coach.email}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner">
          <p className="font-semibold text-gray-700 dark:text-gray-200">
            Contact Number
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {coach.contact_number}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner desktop:col-span-2">
          <p className="font-semibold text-gray-700 dark:text-gray-200">
            Experience
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {coach.experience}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Bio
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {coach.bio || "No bio available."}
        </p>
      </div>
    </div>
  );
};

export default CoachInfo;
