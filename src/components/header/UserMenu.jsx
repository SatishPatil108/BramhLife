import { useState, useRef, useEffect } from "react";
import { LogOut, User, KeyRound } from "lucide-react";
import { createPortal } from "react-dom";
import { useHeader } from "./useHeader";
import { useNavigate } from "react-router-dom";
import defaultImg from "@/assets/user.png"
import { clearUserError } from "@/store/feature/user/userSlice";
import { useDispatch } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const UserMenu = () => {
    const { user } = useHeader();
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState(null);
    const menuRef = useRef();
    const btnRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMobile = window.innerWidth < 768;

    // close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !btnRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    if (!user) return null;

    // calculate absolute position
    const toggleMenu = () => {
        setOpen(!open);

        if (!open && btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();

            // calculate correct positions
            setCoords({
                top: isMobile ? rect.top - 120 : rect.bottom + 8,
                left: isMobile ? rect.right - 170 : rect.right - 170,
            });
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <img
                ref={btnRef}
                src={`${BASE_URL}${user.profile_picture_url}`}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer border border-purple-500"
                onError={(e) => e.target.src = defaultImg}
                onClick={toggleMenu}
            />

            {/* Portal Dropdown Menu */}
            {open &&
                coords &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="fixed z-[9999] bg-white shadow-xl rounded-xl py-1 w-44 border border-gray-200"
                        style={{
                            top: coords.top,
                            left: coords.left,
                        }}
                    >
                        {/* PROFILE */}
                        <button
                            onClick={() => {
                                dispatch(clearUserError());
                                navigate("/view-profile");
                                setOpen(!open);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-purple-100 rounded-md transition text-left"
                        >
                            <User size={18} /> View / Edit Profile
                        </button>

                        {/* CHANGE PASSWORD */}
                        <button
                            onClick={() => {
                                dispatch(clearUserError());
                                navigate("/change-password");
                                setOpen(!open);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-purple-100 rounded-md transition text-left"
                        >
                            <KeyRound size={18} /> Change Password
                        </button>

                        {/* LOGOUT */}
                        <button
                            onClick={() => {
                                dispatch(clearUserError());
                                navigate("/logout");
                                setOpen(!open);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-100 rounded-md transition text-left"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default UserMenu;