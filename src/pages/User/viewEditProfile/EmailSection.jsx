const EmailSection = ({
    userDetails,
    originalUserDetails,
    errors,
    setErrors,
    otpSent,
    isEmailVerified,
    isOtpButtonDisabled,
    timer,
    sendOtp,
    setOtpSent,
    setIsEmailVerified,
    setIsOtpButtonDisabled,
    setTimer,
    setUserDetails
}) => {
    return (
        <div className="mb-4">
            <label className="font-semibold block mb-1">Email</label>

            <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={(e) => {
                    const email = e.target.value;

                    setErrors((prev) => ({ ...prev, email: "" }));
                    setUserDetails((prev) => ({ ...prev, email }));

                    if (email === originalUserDetails.email) {
                        setOtpSent(false);
                        setIsEmailVerified(true);
                    } else {
                        setOtpSent(false);
                        setIsEmailVerified(false);
                    }
                }}
                className="w-full border p-2 rounded"
            />

            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            {userDetails.email !== originalUserDetails.email && !isEmailVerified && (
                <button
                    onClick={async () => {
                        const email = userDetails.email;

                        if (!email.trim()) {
                            return setErrors((p) => ({ ...p, email: "Email is required" }));
                        }

                        const emailRegex = /^\S+@\S+\.\S+$/;
                        if (!emailRegex.test(email)) {
                            return setErrors((p) => ({ ...p, email: "Enter valid email" }));
                        }

                        setErrors((p) => ({ ...p, email: "" }));

                        if (isOtpButtonDisabled) return;

                        const sent = await sendOtp(email);

                        if (sent) {
                            setOtpSent(true);
                            setIsEmailVerified(false);

                            setIsOtpButtonDisabled(true);
                            setTimer(60);

                            localStorage.setItem(
                                "otp_timer_expiry",
                                Date.now() + 60 * 1000
                            );
                        }
                    }}
                    disabled={isOtpButtonDisabled}
                    className={`mt-2 px-4 py-1 rounded text-white
                        ${isOtpButtonDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-700"
                        }`}
                >
                    {isOtpButtonDisabled ? `Resend in ${timer}s` : "Validate Email"}
                </button>
            )}
        </div>
    );
};

export default EmailSection;

