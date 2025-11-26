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
    <div className="min-h-screen flex items-center justify-center  px-2">
      <form onSubmit={handleRegister} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

        <input id="email"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Username" required
        />

        <input id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Email" required />

        <input id="email" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Password" required />

        {/* Inline feedback messages */}
        {error && (
          <p className="text-red-600 font-medium text-center">{error}</p>
        )}
        {userRegisterSuccess && !error && (
          <p className="text-green-500 font-medium text-center">
            ✅ Registration successful!
          </p>
        )}

        <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"> {loading ? "Registering..." : "Register"} </button>

        <p className="text-center mt-4">Already have an account? {' '}
          <Link
            to="/login"
            className="text-blue-500 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
