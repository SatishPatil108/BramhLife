import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useCoachesList from "./useCoachesList";
import {
  addNewCoachAPI,
  deleteCoachAPI,
  fetchAllSubDomainsAPI,
  updateCoachAPI,
} from "@/store/feature/admin";
import { FaEdit, FaTrash } from "react-icons/fa";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import CoachInfo from "./CoachInfo";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachesList = () => {
  const dispatch = useDispatch();
  const { coaches, loading, error, domains, subdomains } = useCoachesList();
  console.log(coaches)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [errors, setErrors] = useState({});

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [domainId, setDomainId] = useState("");
  const [subdomainId, setSubdomainId] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setContactNumber("");
    setExperience("");
    setDomainId("");
    setSubdomainId("");
    setProfessionalTitle("");
    setBio("");
    setProfilePicture(null);
    setErrors({});
    setEditingCoach(null);
    setShowForm(false);
    setIsDrawerOpen(false);
  };

  const handleAddCoach = () => {
    resetForm();
    setShowForm(true);
    setIsDrawerOpen(true);
  };

  const handleRowClick = (coach) => {
    setSelectedCoach(coach);
    setEditingCoach(coach);
    setShowForm(false);
    setIsDrawerOpen(true);
  };

  const handleEditCoach = (coach) => {
    setEditingCoach(coach);
    setName(coach.name || "");
    setEmail(coach.email || "");
    setContactNumber(coach.contact_number || "");
    setExperience(coach.experience || "");
    setDomainId(coach.domain_id?.toString() || "");
    setSubdomainId(coach.subdomain_id?.toString() || "");
    setProfessionalTitle(coach.professional_title || "");
    setBio(coach.bio || "");
    setProfilePicture(null);
    setErrors({});
    setShowForm(true);

    if (coach.domain_id) {
      dispatch(fetchAllSubDomainsAPI({ domainId: coach.domain_id }));
    }

    setIsDrawerOpen(true);
  };

  const handleDomainChange = (e) => {
    const selectedDomainId = e.target.value;
    setDomainId(selectedDomainId);
    setSubdomainId("");
    if (selectedDomainId) dispatch(fetchAllSubDomainsAPI({ domainId: selectedDomainId }));
  };

  const handleDeleteCoach = (coachId) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      dispatch(deleteCoachAPI(coachId));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email address.";

    if (!contactNumber.trim()) newErrors.contactNumber = "Contact number is required.";
    else if (!/^[0-9]{10}$/.test(contactNumber)) newErrors.contactNumber = "Contact number must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCoach = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact_number", contactNumber);
    formData.append("experience", experience);
    formData.append("domain_id", domainId);
    formData.append("subdomain_id", subdomainId);
    formData.append("professional_title", professionalTitle);
    formData.append("bio", bio);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    if (editingCoach) {
      dispatch(updateCoachAPI({ coachId: editingCoach.coach_id, coachData: formData })).then(() => resetForm());
    } else {
      dispatch(addNewCoachAPI(formData)).then(() => resetForm());
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Coaches</h1>
        <div className="mb-6 flex justify-end">
          <CustomButton onClick={handleAddCoach} variant="dark">Add Coach</CustomButton>
        </div>
      </div>


      {loading && <p className="text-blue-500 text-center text-lg">Loading coaches...</p>}
      {error && <p className="text-red-500 text-center text-lg">Error: {error}</p>}

      {!loading && !error && coaches.length > 0 ? (
        <div className="space-y-6 max-w-6xl mx-auto">
          {coaches.map((coach) => (
            <div
              key={coach.coach_id}
              className=" flex flex-col lg:flex-row items-center justify-between bg-[url(/card_background.png)]
               bg-cover bg-center border border-gray-300 rounded-2xl p-6 hover:shadow-sm transition duration-300"
              onClick={() => handleRowClick(coach)}
            >
              {/* Left: Image */}
              <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-6 flex justify-center items-center">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-gray-300 dark:border-gray-700 shadow-md bg-gray-100 dark:bg-gray-800">
                  <img
                    src={
                      `${BASE_URL}${coach.profile_image_url}`

                    }
                    alt={coach.profile_image_url || "Coach Avatar"}
                    className="w-full h-full object-fit transition-transform duration-300 hover:scale-105"
                  // onError={(e) => (e.target.src = "/placeholder-avatar.png")}
                  />
                </div>
              </div>


              {/* Middle: Info */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{coach.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{coach.professional_title}</p>
                <p className="text-gray-600 dark:text-gray-300 text-base mt-2">{coach.email}</p>
                <p className="text-gray-500 dark:text-gray-400 text-base">{coach.contact_number}</p>
                <p className="text-gray-700 dark:text-gray-200 font-medium mt-3">
                  Experience: {coach.experience}
                </p>
              </div>

              {/* Right: Buttons */}
              <div className="flex flex-row lg:flex-col items-center justify-center gap-3 mt-4 lg:mt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCoach(coach);
                  }}
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition text-base font-medium"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCoach(coach.coach_id);
                  }}
                  className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition text-base font-medium"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-500 dark:text-gray-400 text-center mt-8 text-lg">
            No coaches found.
          </p>
        )
      )}

      {/* Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={resetForm}
        title={showForm ? (editingCoach ? "Edit Coach" : "Add New Coach") : "Coach Details"}
        footer={
          showForm && (
            <CustomButton variant="dark" type="submit" onClick={handleSaveCoach}>
              Save
            </CustomButton>
          )
        }
      >
        {showForm ? (
          <form className="flex-1 overflow-y-auto space-y-4 pr-2" onSubmit={handleSaveCoach}>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border p-2 rounded-md" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded-md" />
              <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact Number" className="w-full border p-2 rounded-md" />
              <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" className="w-full border p-2 rounded-md" />
              <input type="text" value={professionalTitle} onChange={(e) => setProfessionalTitle(e.target.value)} placeholder="Professional Title" className="w-full border p-2 rounded-md" />
              <select value={domainId} onChange={handleDomainChange} className="w-full border p-2 rounded-md">
                <option value="">Select Domain</option>
                {domains?.map((d) => (
                  <option key={d.domain_id} value={d.domain_id?.toString()}>{d.domain_name}</option>
                ))}
              </select>
              <select value={subdomainId} onChange={(e) => setSubdomainId(e.target.value)} className="w-full border p-2 rounded-md">
                <option value="">Select Subdomain</option>
                {subdomains?.map((s) => (
                  <option key={s.subdomain_id} value={s.subdomain_id?.toString()}>{s.subdomain_name}</option>
                ))}
              </select>
            </div>

            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="w-full border p-2 rounded-md h-32" />

            <div className="w-full">
              <label className="block mb-2 font-medium">Upload Profile Picture</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <span className="text-gray-500 dark:text-gray-300">Click to choose an image</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setProfilePicture(e.target.files[0])} />
              </label>
              {profilePicture && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Selected File: {profilePicture.name}</p>
                  <img src={URL.createObjectURL(profilePicture)} alt="Preview" className="w-24 h-24 object-cover mt-2 border rounded-md" />
                </div>
              )}
            </div>

            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </form>
        ) : (
          <CoachInfo coach={selectedCoach} />
        )}
      </CustomDrawer>
    </div>
  );
};

export default CoachesList;
