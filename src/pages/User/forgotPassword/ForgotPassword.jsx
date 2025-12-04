import React from "react";
import useForgotPassword from "./useForgotPassword";
import OtpInput from "@/components/OTPInput/OtpInput";
import { motion } from "framer-motion";

const ForgotPassword = () => {
    const {
        email,
        setEmail,
        otp,
        otpRefs,
        handleOtpChange,
        handleOtpKeyDown,
        verifyOtp,
        newPass,
        setNewPass,
        confirmPass,
        setConfirmPass,
        error,
        successMsg,
        step,
        validateEmail,
        handleSendOtp,
        handleResetPassword,
    } = useForgotPassword();

    return (
        <div className="min-h-screen flex items-center justify-center p-5 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md"
            >
                <motion.h2
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl sm:text-3xl font-bold text-center mb-5"
                >
                    Forgot Password
                </motion.h2>

                {/* Error & Success Messages */}
                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-center mb-3 text-sm"
                    >
                        {error}
                    </motion.p>
                )}

                {successMsg && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-600 text-center mb-3 text-sm"
                    >
                        {successMsg}
                    </motion.p>
                )}

                {/* STEP 1: ENTER EMAIL */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <label className="font-medium">Enter Your Email</label>
                        <input
                            type="email"
                            value={email}
                            onBlur={validateEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-3 w-full rounded-lg mt-2 mb-6 outline-none focus:border-purple-600 transition"
                            placeholder="you@example.com"
                        />

                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={handleSendOtp}
                            className="w-full bg-purple-600 text-white py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-purple-700 transition"
                        >
                            Send OTP
                        </motion.button>
                    </motion.div>
                )}

                {/* STEP 2: ENTER OTP */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <OtpInput
                            otp={otp}
                            otpRefs={otpRefs}
                            handleOtpChange={handleOtpChange}
                            handleOtpKeyDown={handleOtpKeyDown}
                            verifyOtp={verifyOtp}
                            setIsEmailVerified={() => { }}
                        />

                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={verifyOtp}
                            className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700"
                        >
                            Verify OTP
                        </motion.button>
                    </motion.div>
                )}

                {/* STEP 3: NEW PASSWORD */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <label className="font-medium">New Password</label>
                        <input
                            type="password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="border p-3 w-full rounded-lg mt-2 mb-5 outline-none focus:border-purple-600 transition"
                            placeholder="New Password"
                        />

                        <label className="font-medium">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="border p-3 w-full rounded-lg mt-2 mb-6 outline-none focus:border-purple-600 transition"
                            placeholder="Confirm Password"
                        />

                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={handleResetPassword}
                            className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700"
                        >
                            Reset Password
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;