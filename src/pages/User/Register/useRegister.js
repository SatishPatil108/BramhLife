import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserAPI } from "@/store/feature/auth";
import { clearError } from "@/store/feature/auth/authSlice";

const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use registerSuccess here instead of isAuthenticated
  const { isLoading, error, registerSuccess } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(1);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);
    dispatch(clearError());

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const registrationData = {
      name,
      email,
      contact_number: contactNumber,
      password,
      dob,
      gender,
      profile_picture_url: profilePictureUrl,
    };

    dispatch(registerUserAPI(registrationData));
  };

  useEffect(() => {
    if (registerSuccess) {
      setSuccessMessage("Registration successful! Redirecting to login...");

      // Clear form fields
      setName("");
      setEmail("");
      setContactNumber("");
      setPassword("");
      setConfirmPassword("");
      setDob(null);
      setGender(1);
      setProfilePictureUrl(null);

      // Redirect after 2 seconds
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);

      return () => clearTimeout(timer); // cleanup timer if component unmounts
    }
  }, [registerSuccess, navigate]);

  return {
    name,
    setName,
    email,
    setEmail,
    contactNumber,
    setContactNumber,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    dob,
    setDob,
    gender,
    setGender,
    profilePictureUrl,
    setProfilePictureUrl,
    error: localError || error,
    successMessage,
    loading: isLoading,
    handleRegister,
  };
};

export default useRegister;
