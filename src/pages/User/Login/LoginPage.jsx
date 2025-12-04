import React, { useState } from "react";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";
import { LucideMail, LucideLock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

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

  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });

  const validateInputs = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email.includes("@")) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setValidationError(newErrors);
    return valid;
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 px-6">

      {/* --- Mobile logo / header --- */}
      <div className="md:hidden text-center mt-8 mb-4">
        <img src={assets.mindimage} alt="Logo" className="w-20 mx-auto" />
      </div>

      {/* --- Left Side Image --- */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex w-1/2 justify-center items-center"
      >
        <img
          src={assets.loginbanner}
          alt="Login Banner"
          className="w-full max-h-[550px] object-contain"
        />
      </motion.div>

      {/* --- Login Form --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center items-center px-6"
      >
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-6 rounded-xl text-center"
        >
          <h2 className="text-3xl md:text-4xl text-gray-900 font-bold mb-2">
            Sign In
          </h2>
          <p className="text-gray-500 mb-5">
            Welcome back! Please sign in to continue
          </p>

          {/* --- Google Login Button --- */}
          <button
            type="button"
            className="w-full bg-gray-100 flex items-center justify-center gap-2 py-3 rounded-full text-gray-700"
          >
            Sign in with
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="Google Logo"
              className="w-auto h-auto"
            />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full my-6 text-gray-400 text-sm">
            <hr className="flex-1 border-gray-300" /> OR <hr className="flex-1 border-gray-300" />
          </div>

          {/* --- Email Field --- */}
          <div className="flex gap-3 items-center w-full border border-gray-300 rounded-full h-12 px-4 mb-6">
            <LucideMail className="text-gray-400" />
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
          </div>
          {validationError.email && (
            <p className="text-xs text-red-500 text-left mb-2">{validationError.email}</p>
          )}

          {/* --- Password Field --- */}
          <div className="flex gap-3 items-center w-full border border-gray-300 rounded-full h-12 px-4  mb-6">
            <LucideLock className="text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
            </button>
          </div>
          {validationError.password && (
            <p className="text-xs text-red-500 text-left mb-2">{validationError.password}</p>
          )}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mt-3 mb-5 text-gray-500 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              Remember me
            </label>
            <Link className="text-blue-500 hover:underline" to={"/forgot-password"}>Forgot Password?</Link>
          </div>

          {/* Overall Auth Message */}
          {error && <p className="text-red-500 text-sm mb-2">{error.message}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-full hover:bg-purple-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-500 text-sm mt-5">
            Don’t have an account?
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Sign Up
            </Link>
          </p>

        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;