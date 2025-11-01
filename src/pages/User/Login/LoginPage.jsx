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
    userLoginSuccess, // we'll expose this from useLogin
  } = useLogin();

  return (
    <div className="text-black flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 bg-gray-50 py-14">
        <div className="bg-white w-sm max-w-full p-6 rounded-2xl shadow-sm bg-gradient-to-t from-[#ecb99e] to-[#02656b]">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-black">Email</label>
              <input
                type="email"
                className="w-full bg-white border border-gray-300 text-black rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-black">Password</label>
              <input
                type="password"
                className="w-full bg-white border border-gray-300 text-black rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {/* Inline feedback messages */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            {userLoginSuccess && !error && (
              <p className="text-green-500 text-sm text-center">
                Login successful
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-black">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 hover:underline">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
