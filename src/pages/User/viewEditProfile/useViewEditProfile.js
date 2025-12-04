import {
    updateProfileAPI,
    sendOtpAPI,
    verifyOtpAPI
} from "@/store/feature/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useViewEditProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { isLoading, error } = useSelector((state) => state.auth);

    const [userDetails, setUserDetails] = useState(null);
    const [originalUserDetails, setOriginalUserDetails] = useState(null);

    /* Load user into local state */
    useEffect(() => {
        if (user) {
            setUserDetails({ ...user });
            setOriginalUserDetails({ ...user });
        }
    }, [user]);

    /* Send OTP */
    const sendOtp = async (email) => {
        let toastId;
        try {
            toastId = toast.loading(`Sending OTP to ${email}...`);
            await dispatch(sendOtpAPI(email)).unwrap();

            toast.update(toastId, {
                render: `OTP sent to ${email}`,
                type: "success",
                isLoading: false,
                autoClose: 2000
            });

            return true;
        } catch (err) {
            toast.update(toastId, {
                render: err?.message || "Failed to send OTP",
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
            return false;
        }
    };

    /* Verify OTP */
    const verifyOtp = async (otp) => {
        let toastId;
        try {
            toastId = toast.loading("Verifying OTP...");
            const res = await dispatch(verifyOtpAPI(otp)).unwrap();

            if (res?.success) {
                toast.update(toastId, {
                    render: res.message || "OTP verified!",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                });
                return true;
            }

            toast.update(toastId, {
                render: res?.message || "Invalid OTP",
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
            return false;
        } catch (err) {

            toast.update(toastId, {
                render: err?.message || "Failed to verify OTP",
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
            return false;
        }
    };

    /* Update Profile */
    const updateProfile = async () => {
        let toastId;
        try {
            toastId = toast.loading("Updating profile...");

            const formData = new FormData();
            formData.append("name", userDetails.name);
            formData.append("contact_number", userDetails.contact_number);
            formData.append("dob", userDetails.dob);
            formData.append("gender", userDetails.gender);
            formData.append("email", userDetails.email);

            if (userDetails.profile_picture_url && typeof userDetails.profile_picture_url === "object") {
                formData.append("profile_picture", userDetails.profile_picture_url);
            }

            await dispatch(updateProfileAPI(formData));

            toast.update(toastId, {
                render: "Profile updated successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000
            });
        } catch (err) {
            toast.update(toastId, {
                render: "Failed to update profile",
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
        }
    };

    return {
        userDetails,
        originalUserDetails,
        isLoading,
        error,
        setUserDetails,
        updateProfile,
        sendOtp,
        verifyOtp
    };
};

export default useViewEditProfile;