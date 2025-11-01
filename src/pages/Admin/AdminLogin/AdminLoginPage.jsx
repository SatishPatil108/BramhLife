import React from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useLoginPage from "./useLoginPage";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const AdminLoginPage = () => {
  const {
    email,
    password,
    togglePass,
    setEmail,
    setPassword,
    setTogglePass,
    loading,
    error,
    handleLogin,
    loginSuccess,
  } = useLoginPage();
  const navigate = useNavigate();
  console.log(loginSuccess);
  if (loginSuccess) {
    navigate("admin/dashboard");
  }

  return (
    <main className="flex-grow flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">

      <div
        className="
      bg-gray-100 dark:bg-gray-700 
      w-full 
      max-w-sm 
      mobile:max-w-xs 
      desktop:max-w-sm 
      p-6 
      desktop:p-6 
      rounded-2xl 
      shadow-xl 
      transition-colors duration-300
    "
      >
        <h2
          className="
        text-2xl desktop:text-2xl 
        font-bold text-center mb-6 
        text-black dark:text-white
      "
        >
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-black dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div className="relative w-full mb-4">
            <label className="block mb-1 font-medium text-black dark:text-gray-200">
              Password
            </label>
            <input
              type={togglePass ? "password" : "text"}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-lg px-3 py-2 pr-10 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setTogglePass((prev) => !prev)}
              className="absolute top-9 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              {togglePass ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error.message}</p>}
          {loginSuccess && !error && (
            <p className="text-green-500 text-sm text-center">Login successful</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${loading
              ? "bg-indigo-300 dark:bg-indigo-600 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>

  );
};

export default AdminLoginPage;
