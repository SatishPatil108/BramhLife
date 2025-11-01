import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "@/store/feature/auth/authSlice";

const UserLoggedOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
//   const { user } = useSelector((state) => state.auth)
//   console.log(user)

  const handleLogout = () => {
    // const confirmLogout = window.confirm("Are you sure you want to logout?");
    // if (confirmLogout) {
      dispatch(logoutUser());
      setConfirmed(true);

      toast.info("Thanks for visiting! 👋", {
        position: "top-center",
        autoClose: 2000,
      }
    );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {!confirmed ? (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Logout</h2>
          {/* <p className="mb-6 text-gray-600">
            User Name: {user.name}
          </p> */}
          <div className="flex gap-5">
            <button
              onClick={() => { }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Thanks for visiting!
          </h2>
          <p className="text-gray-600">We hope to see you again soon. Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default UserLoggedOut;