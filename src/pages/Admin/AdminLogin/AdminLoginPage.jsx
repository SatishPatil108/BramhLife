import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLoginPage from "./useLoginPage";

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

  if (loginSuccess) {
    navigate("admin/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-6">
      {/* Card */}
      <div className="bg-white w-100 max-w-md p-8 sm:p-8 rounded-3xl shadow-xl">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Admin Login
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={togglePass ? "password" : "text"}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-2 pr-10 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setTogglePass((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
              >
                {togglePass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error.message}</p>
          )}

          {/* Success Message */}
          {loginSuccess && !error && (
            <p className="text-green-500 text-sm text-center">Login successful</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${loading
                ? "bg-indigo-300 dark:bg-indigo-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-400 text-white shadow-md"
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
