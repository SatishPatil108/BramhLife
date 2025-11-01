import React from "react";
import { Link } from "react-router-dom";
import useRegister from "./useRegister";


const Register = () => {
  const {
    name,
    email,
    contactNumber,     
    password,
    confirmPassword,
    setName,
    setEmail,
    setContactNumber,  
    setPassword,
    setConfirmPassword,
    error,
    loading,
    handleRegister,
  } = useRegister();

  return (
    <div className="min-h-screen flex flex-col text-black">  

      <main className="flex-grow flex items-center justify-center px-4 py-16  bg-[url(/gradientBackground.png)]">
        <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-gradient-to-t from-[#ecb99e] to-[#02656b]">
          <h2 className="text-3xl font-bold text-center mb-6 text-white">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-5 ">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium text-black">Name</label>
              <input
                type="text"
                className="w-full bg-white border border-gray-300 text-black rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
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

            {/* Contact Number - NEW FIELD */}
            <div>
              <label className="block mb-1 font-medium text-black">Contact Number</label>
              <input
                type="tel"
                className="w-full bg-white border border-gray-300 text-black rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
                placeholder="Enter your contact number"
              />
            </div>

            {/* Password */}
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

            {/* Confirm Password */}
            <div>
              <label className="block mb-1 font-medium text-black">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full bg-white border border-gray-300 text-black rounded-lg px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-black">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
