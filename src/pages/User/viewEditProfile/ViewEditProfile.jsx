import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useViewEditProfile from "./useViewEditProfile";
import defaultImg from "@/assets/user.png";
import OtpInput from "../../../components/OTPInput/OtpInput";
import EmailSection from "./EmailSection";
import { clearUserError } from "@/store/feature/user/userSlice";
import { useDispatch } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const ViewEditProfile = () => {
    const navigate = useNavigate();

    const {
        userDetails,
        originalUserDetails,
        isLoading,
        error,
        setUserDetails,
        updateProfile,
        sendOtp,
        verifyOtp
    } = useViewEditProfile();
  const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(true);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpRefs = useRef([]);
    const fileInputRef = useRef(null);

    const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    const isProfileChanged =
        JSON.stringify(userDetails) !== JSON.stringify(originalUserDetails);

    /* ----- Load Saved Timer on Refresh ----- */
    useEffect(() => {
        const expiry = localStorage.getItem("otp_timer_expiry");
        if (!expiry) return;

        const diff = Math.floor((expiry - Date.now()) / 1000);
        if (diff > 0) {
            setIsOtpButtonDisabled(true);
            setTimer(diff);
        }
    }, []);

    /* ----- Countdown Timer ----- */
    useEffect(() => {
        let interval;
        if (isOtpButtonDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        localStorage.removeItem("otp_timer_expiry");
                        setIsOtpButtonDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer, isOtpButtonDisabled]);

    /* ----- OTP Input Logic ----- */
    const handleOtpChange = (e, idx) => {
        const val = e.target.value;
        if (!/^\d?$/.test(val)) return;

        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);

        if (val && idx < 5) otpRefs.current[idx + 1].focus();
    };

    const handleOtpKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            otpRefs.current[idx - 1].focus();
        }

        if ((e.ctrlKey || e.metaKey) && e.key === "v") {
            navigator.clipboard.readText().then((text) => {
                if (/^\d{6}$/.test(text)) {
                    setOtp(text.split(""));
                    otpRefs.current[5].focus();
                }
            });
        }
    };

    /* ----- Input Change Handler ----- */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserDetails((prev) => ({
            ...prev,
            [name]: name === "gender" ? Number(value) : value
        }));

        if (name === "email") {
            if (value === originalUserDetails.email) {
                setOtpSent(false);
                setIsEmailVerified(true);
            } else {
                setOtpSent(false);
                setIsEmailVerified(false);
            }
        }
    };

    /* ----- Update Profile ----- */
    const handleUpdateProfile = () => {
        if (userDetails.email !== originalUserDetails.email && !isEmailVerified) {
            alert("Verify your email first!");
            return;
        }
        updateProfile(userDetails);
    };

    if (!userDetails) return <p>Loading...</p>;

    return (
        <div className="max-w-xl mx-auto mt-12 p-8 rounded-2xl shadow-xl bg-white border relative">

            <button onClick={() =>{ dispatch(clearUserError());
                 navigate(-1)}} className="absolute top-4 right-4">
                <X size={28} />
            </button>

            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                Edit Profile
            </h2>

            {/* PROFILE IMAGE */}
            <div className="text-center mb-6">
                <div
                    className="w-32 h-32 mx-auto rounded-full overflow-hidden cursor-pointer border-2"
                    onClick={() => fileInputRef.current.click()}
                >
                    <img
                        src={
                            typeof userDetails.profile_picture_url === "string"
                                ? `${BASE_URL}${userDetails.profile_picture_url}`
                                : userDetails.profile_picture_url
                                    ? URL.createObjectURL(userDetails.profile_picture_url)
                                    : defaultImg
                        }
                        className="w-full h-full object-cover"
                    />
                </div>

                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setUserDetails((prev) => ({
                                ...prev,
                                profile_picture_url: e.target.files[0]
                            }));
                        }
                    }}
                />
            </div>

            {/* NAME */}
            <InputField label="Full Name" name="name" value={userDetails.name} onChange={handleChange} />

            {/* CONTACT */}
            <InputField label="Contact Number" name="contact_number" value={userDetails.contact_number} onChange={handleChange} />

            {/* DOB */}
            <InputField label="Date of Birth" type="date" name="dob" value={userDetails.dob} onChange={handleChange} />

            {/* GENDER */}
            <GenderSelector value={userDetails.gender} onChange={handleChange} />

            {/* EMAIL + SEND OTP */}
            <EmailSection
                userDetails={userDetails}
                originalUserDetails={originalUserDetails}
                errors={errors}
                setErrors={setErrors}
                otpSent={otpSent}
                isEmailVerified={isEmailVerified}
                isOtpButtonDisabled={isOtpButtonDisabled}
                timer={timer}
                sendOtp={sendOtp}
                setOtpSent={setOtpSent}
                setIsEmailVerified={setIsEmailVerified}
                setIsOtpButtonDisabled={setIsOtpButtonDisabled}
                setTimer={setTimer}
                setUserDetails={setUserDetails}  // ✅ add this
            />


            {/* OTP INPUT */}
            {otpSent && !isEmailVerified && (
                <OtpInput
                    otp={otp}
                    otpRefs={otpRefs}
                    handleOtpChange={handleOtpChange}
                    handleOtpKeyDown={handleOtpKeyDown}
                    verifyOtp={verifyOtp}
                    setIsEmailVerified={setIsEmailVerified}
                />
            )}

            {/* UPDATE BUTTON */}
            <button
                disabled={!isProfileChanged || (userDetails.email !== originalUserDetails.email && !isEmailVerified)}
                onClick={handleUpdateProfile}
                className={`w-full py-2 rounded text-white text-lg mt-6
                ${!isProfileChanged || !isEmailVerified ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"}
                `}
            >
                Update Profile
            </button>
        </div>
    );
};

/* 💡 Smaller Reusable Components */

const InputField = ({ label, ...props }) => (
    <div className="mb-4">
        <label className="font-semibold block mb-1">{label}</label>
        <input {...props} className="w-full border p-2 rounded" />
    </div>
);

const GenderSelector = ({ value, onChange }) => (
    <div className="mb-4">
        <label className="font-semibold block mb-1">Gender</label>
        <div className="flex gap-6">
            {[{ id: 1, label: "Male" }, { id: -1, label: "Female" }, { id: 0, label: "Other" }].map((g) => (
                <label key={g.id} className="flex items-center gap-2">
                    <input type="radio" name="gender" value={g.id} checked={value == g.id} onChange={onChange} />
                    {g.label}
                </label>
            ))}
        </div>
    </div>
);

export default ViewEditProfile;