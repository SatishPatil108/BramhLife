import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCourseFeedbackAPI } from "@/store/feature/user"; // adjust path

const FeedbackForm = ({ courseId, enrollmentId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comments.trim()) {
      alert("Please enter your comments before submitting.");
      return;
    }

    const feedbackData = {
      enrollment_id: enrollmentId,
      course_id: courseId,
      rating,
      comments,
    };
    console.log("Submitting feedback:", feedbackData);
    dispatch(postCourseFeedbackAPI(feedbackData))
      .unwrap()
      .then((res) => {
        alert("Feedback submitted successfully!");
        console.log("Response:", res);
        setComments("");
        setRating(5);
      })
      .catch((err) => {
        alert("Failed to submit feedback. Please try again.");
        console.error("Error:", err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gray-50 shadow-md rounded-2xl space-y-4 mb-16"
    >
      <h2 className="text-xl font-bold text-gray-800 text-center">
        Submit Your Feedback
      </h2>

      {/* Rating */}
      <div>
        <label className="block text-gray-700 mb-2">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>
      </div>

      {/* Comments */}
      <div>
        <label className="block text-gray-700 mb-2">Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows="4"
          placeholder="Write your feedback here..."
          className="w-full border rounded-lg px-3 py-2"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
