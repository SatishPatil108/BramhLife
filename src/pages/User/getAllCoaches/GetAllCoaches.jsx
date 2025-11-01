import React, { useState } from "react";
import useGetAllCoaches from "./useGetAllCoaches";


const GetAllCoaches = () => {
  const [pageNo, setPageNo] = useState(1);
  const pageSize = 5;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;



  const { coaches, isLoading, error } = useGetAllCoaches(pageNo, pageSize);

  const handleNext = () => setPageNo((prev) => prev + 1);
  const handlePrev = () => setPageNo((prev) => Math.max(prev - 1, 1));

  if (isLoading) return <p>Loading coaches...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All Coaches</h2>
      {coaches.length === 0 ? (
        <p>No coaches found.</p>
      ) : (
        <ul>
          {coaches.map((coach) => (
            <li key={coach.coach_id} style={{ marginBottom: "20px" }}>
              <img
                src={`${BASE_URL}${coach.profile_image_url}`}
                alt={coach.name}
                width={100}
                style={{ borderRadius: "50%" }}
              />
              <h3>{coach.name}</h3>
              <p>Email: {coach.email}</p>
              <p>Contact: {coach.contact_number}</p>
              <p>Experience: {coach.experience}</p>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrev} disabled={pageNo === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {pageNo}</span>
        <button onClick={handleNext} disabled={coaches.length < pageSize}>
          Next
        </button>
      </div>
    </div>
  );
};

export default GetAllCoaches;
