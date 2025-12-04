const OtpInput = ({
    otp,
    otpRefs,
    handleOtpChange,
    handleOtpKeyDown,
    verifyOtp,
    setIsEmailVerified
}) => {
    return (
        <div className="mb-4">
            <label className="font-semibold block mb-2">Enter OTP</label>

            <div className="flex gap-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        maxLength={1}
                        value={digit}
                        ref={(el) => (otpRefs.current[index] = el)}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="w-10 h-12 text-center border rounded text-xl font-semibold"
                    />
                ))}
            </div>

            <button
                onClick={async () => {
                    const finalOtp = otp.join("");

                    if (finalOtp.length !== 6) {
                        alert("Please enter 6-digit OTP");
                        return;
                    }

                    const verified = await verifyOtp(finalOtp);

                    if (verified) {
                        setIsEmailVerified(true);
                    }
                }}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
                Verify OTP
            </button>
        </div>
    );
};

export default OtpInput;