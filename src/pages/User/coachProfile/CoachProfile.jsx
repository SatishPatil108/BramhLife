import React from "react";
import { useParams } from "react-router-dom";
import useCoachProfile from "./useCoachProfile";
import CoachesInfoPage from "../coachesInfo";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachProfile = () => {
  const { coachId } = useParams();
  const { coachProfile, loading, error } = useCoachProfile(coachId);

  if (loading) return <p>Loading coach details...</p>;

  if (error) {
    const errorMessage =
      typeof error === "string" ? error : error?.message || "Something went wrong";
    return <p>Error: {errorMessage}</p>;
  }

  if (!coachProfile) return <p>No coach details available.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-xl text-center">
     
      <h1 className="text-4xl font-bold mb-2">{coachProfile.name}</h1>

 
      <p className="text-xl text-gray-600 mb-6">{coachProfile.professional_title}</p>

      
      {coachProfile.profile_image_url && (
        <div className="">     
            <img
            src={`${BASE_URL}${coachProfile.profile_image_url}`}
            alt={coachProfile.name}
            className="max-w-full object-contain rounded-full mx-auto"
           />
        </div>        
      )}

      
      <p className="lg:text-lg text-xl text-gray-500 mt-6">
        📧 {coachProfile.email}    📞 {coachProfile.contact_number}
      </p>

      <p className="mt-2 mb-4 lg:text-lg text-xl">
        <strong className="text-start">Experience:</strong> {coachProfile.experience}
      </p>

    
      <p className="mb-6  lg:text-lg text-xl text-start leading-relaxed">
        {coachProfile.bio}
      </p>
      <CoachesInfoPage/>
    </div>
  );
};

export default CoachProfile;
