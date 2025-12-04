import React, { useRef, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "@/store/feature/auth";
import { toast } from "react-toastify";
import { logoutUser } from "@/store/feature/auth/authSlice";
import { clearUserError } from "@/store/feature/user/userSlice";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentRef = useRef(null);
    const newRef = useRef(null);
    const confirmRef = useRef(null);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;

    // ------------ VALIDATION ON BLUR ------------
    const validate = () => {
        const currentPassword = currentRef.current.value;
        const newPassword = newRef.current.value;
        const confirmPassword = confirmRef.current.value;

        setErrorMsg("");

        // Current password
        if (currentPassword.length > 0 && currentPassword.length < 6) {
            setErrorMsg("Current password must be at least 6 characters.");
            return false;
        }

        // New password strong check
        if (newPassword.length > 0 && !strongPasswordRegex.test(newPassword)) {
            setErrorMsg(
                "New password must be 8–20 chars and include uppercase, lowercase, number, and special character."
            );
            return false;
        }

        // Confirm password match
        if (confirmPassword.length > 0 && newPassword !== confirmPassword) {
            setErrorMsg("New passwords do not match.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const payload = {
            currentPassword: currentRef.current.value,
            newPassword: newRef.current.value,
        };
        const toastId = toast.loading("Updating password...");

        try {
            const response = await dispatch(changePasswordAPI(payload)).unwrap();
            console.log(response)
            if (response.success) {
                toast.update(toastId, {
                    render: response.message || "Password updated successfully.",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                dispatch(logoutUser());
                dispatch(clearUserError());
                navigate("/login");
            } else {
                console.error("Password update failed:", response.success);
                toast.update(toastId, {
                    render: response.message || "Failed to update password.",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Password update error:", error);
            toast.update(toastId, {
                render: error.message || "Failed to update password.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#F4F1FA] p-4">
            <div className="relative bg-white shadow-xl rounded-2xl p-7 w-full max-w-md border border-purple-100">

                <button
                    onClick={() => {
                        dispatch(clearUserError());
                        navigate(-1)
                    }}
                    className="absolute top-3 right-3 text-purple-500 hover:text-purple-700 transition"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-semibold text-center mb-6 text-purple-700">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Current Password */}
                    <div className="relative">
                        <input
                            ref={currentRef}
                            type={showCurrent ? "text" : "password"}
                            placeholder="Current Password"
                            onBlur={validate}
                            className="w-full bg-purple-50 border border-purple-300 text-gray-900 rounded-lg px-3 py-3 pr-11 outline-none transition"
                            required
                        />
                        <span
                            onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute right-3 top-3.5 cursor-pointer text-purple-500"
                        >
                            {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <input
                            ref={newRef}
                            type={showNew ? "text" : "password"}
                            placeholder="New Password"
                            onBlur={validate}
                            className="w-full bg-purple-50 border border-purple-300 text-gray-900 rounded-lg px-3 py-3 pr-11 outline-none transition"
                            required
                        />
                        <span
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-3 top-3.5 cursor-pointer text-purple-500"
                        >
                            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            ref={confirmRef}
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm New Password"
                            onBlur={validate}
                            className="w-full bg-purple-50 border border-purple-300 text-gray-900 rounded-lg px-3 py-3 pr-11 outline-none transition"
                            required
                        />
                        <span
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-3.5 cursor-pointer text-purple-500"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>

                    {/* Error Message */}
                    {errorMsg && (
                        <p className="text-red-600 text-sm mt-1 text-center font-medium">
                            {errorMsg}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg mt-4 hover:bg-purple-700 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;