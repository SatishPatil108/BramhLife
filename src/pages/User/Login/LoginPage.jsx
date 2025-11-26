import React from "react";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";
import { LucideMail, LucideLock } from 'lucide-react';
import { assets } from "@/assets/assets";
const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;


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
    <div className="flex h-[700px] w-full  p-10  mb-8">
      <div className="w-full px-30 hidden md:inline-block">
        <img className="h-full" src={assets.loginbanner} />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form onSubmit={handleLogin} className="md:w-96  w-85 flex flex-col items-center justify-center p-4 lg:p-0 border border-gray-300 lg:border-0  sm:mx-4 md:p-6 sm:p-4 py-8 text-left text-sm rounded-lg 
        shadow-[0px_0px_10px_0px] shadow-black/10 lg:shadow-none">
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="sm:text-sm lg:text-base  text-gray-500/90 mt-3 ">Welcome back! Please sign in to continue</p>

          {/* <button type="button" className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div> */}

          <div className="flex gap-4 mt-4 items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <LucideMail className="text-gray-400" />
            <input type="email" placeholder="Email id"
              value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
          </div>

          <div className="flex gap-4 items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
            <LucideLock className="text-gray-400" />
            <input type="password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">Remember me</label>
            </div>
            <a className="text-sm text-blue-500 underline" href="#">Forgot password?</a>
          </div>

          {/* Inline feedback messages */}
          {error && (
            <p className="text-red-600 font-medium text-center">{error.message}</p>
          )}
          {userLoginSuccess && !error && (
            <p className="text-green-500 font-medium text-center">
              ✅ Login successful!
            </p>
          )}

          <button type="submit" disabled={loading} className="mt-8 w-full h-11 rounded-full text-white font-bold cursor-pointer bg-purple-600 hover:opacity-80 transition-opacity">
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-gray-500/90 text-sm mt-4">Don’t have an account?
            <Link
              to="/register"
              className="text-blue-500 px-3 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;