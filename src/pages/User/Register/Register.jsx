import React from "react";
import { Link } from "react-router-dom";
import useRegister from "./useRegister"; // assuming you have a custom hook like useLogin

const Register = () => {
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    handleRegister,
    loading,
    error,
    userRegisterSuccess,
  } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-2">
      <div className="bg-white sm:w-[36%] w-full mx-4 p-8 sm:p-8 rounded-3xl shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold text-black text-lg">
              Full Name
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 text-black rounded-xl px-4 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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
              placeholder="Create a password"
            />
          </div>

          {/* Inline feedback messages */}
          {error && (
            <p className="text-red-600 font-medium text-center">{error}</p>
          )}
          {userRegisterSuccess && !error && (
            <p className="text-green-500 font-medium text-center">
              ✅ Registration successful!
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
            {loading ? "Registering..." : "Register"} 
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-black sm:text-xl text-balance">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-bold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
