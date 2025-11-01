import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUserAPI } from "@/store/feature/auth";
import { clearError, resetFlags } from "@/store/feature/auth/authSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, userLoginSuccess } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firstRender = useRef(true);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(loginUserAPI({ email, password }));
  };

  // Success redirect
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    console.log(userLoginSuccess);
    if (userLoginSuccess) {
      toast.success("Login successful ✅", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/my-courses");
        dispatch(resetFlags());
      }, 1500);
    }
  }, [userLoginSuccess, navigate, dispatch]);

  
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [error]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading: isLoading,
    error,
    handleLogin,
  };
};

export default useLogin;
