import React from "react";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleLogin,
    userLoginSuccess,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-6">
      <div className="bg-white w-full max-w-md p-8 sm:p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-white border border-gray-300 text-black rounded-xl px-4 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-white border border-gray-300 text-black rounded-xl px-4 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Inline feedback messages */}
          {error && (
            <p className="text-red-600 font-medium text-center">{error}</p>
          )}
          {userLoginSuccess && !error && (
            <p className="text-green-500 font-medium text-center">
              ✅ Login successful!
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-lg font-semibold transition duration-300 ${
              loading
                ? "bg-teal-300 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-50 text-white shadow-sm cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-black text-balance sm:text-xl">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 px-3 hover:underline"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
