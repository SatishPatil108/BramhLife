import {
    sendOtpForForgotPasswordAPI,
    verifyOtpForForgotPasswordAPI,
    changePasswordForForgotPasswordAPI
} from "@/store/feature/auth";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP array
    const otpRefs = useRef([]);

    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [step, setStep] = useState(1);
    const [otpTries, setOtpTries] = useState(0);

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = () => {
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email");
            return false;
        }
        setError("");
        return true;
    };

    // Send OTP
    const handleSendOtp = async () => {
        if (!validateEmail()) return;

        setError("");
        console.log(email)
        try {
            const res = await dispatch(sendOtpForForgotPasswordAPI(email)).unwrap();
            console.log(res.message)
            if (res.success) {
                setSuccessMsg("OTP sent successfully!");
                setStep(2);
            } else {
                setError(res.message);
            }
        } catch (error) {
            console.error(error)
            setError(error.message);
        }

    };

    // OTP input change
    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d?$/.test(value)) return;   // allow only digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    // backspace navigation
    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    // verify OTP
    const verifyOtp = async (finalOtp) => {
        const res = await dispatch(verifyOtpForForgotPasswordAPI({ email, otp: finalOtp })).unwrap();

        if (res.success) {
            setSuccessMsg("OTP verified!");
            setStep(3);
            return true;
        }

        let tries = otpTries + 1;
        setOtpTries(tries);

        if (tries >= 3) {
            setError("Max OTP attempts reached!");
            setStep(1);
            return false;
        }

        setError(`Invalid OTP. Attempts left: ${3 - tries}`);
        return false;
    };

    // reset password
    const handleResetPassword = async () => {
        setError("");

        if (newPass.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        if (newPass !== confirmPass) {
            setError("Passwords do not match");
            return;
        }

        const res = await dispatch(changePasswordForForgotPasswordAPI({ email, newPass })).unwrap();

        if (res.success) {
            setSuccessMsg("Password reset successful!");
            setTimeout(() => {
                dispatch(clearUserError());
                navigate("/login")
            }, 1500);
        } else {
            setError(res.message);
        }
    };

    return {
        email,
        setEmail,
        otp,
        setOtp,
        otpRefs,
        newPass,
        setNewPass,
        confirmPass,
        setConfirmPass,
        error,
        successMsg,
        step,
        validateEmail,
        handleSendOtp,
        verifyOtp,
        handleOtpChange,
        handleOtpKeyDown,
        handleResetPassword,
    };
};

export default useForgotPassword;