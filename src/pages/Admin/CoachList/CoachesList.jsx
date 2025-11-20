import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useCoachesList from "./useCoachesList";
import {
  deleteCoachAPI,
  fetchAllSubDomainsAPI,
} from "@/store/feature/admin";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import CoachInfo from "./CoachInfo";
import FileUploaderWithPreview from "@/components/FileUploaderWithPreview/FileUploaderWithPreview";
import { toast } from "react-toastify";
import { SquarePen, Trash2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachesList = () => {
  const dispatch = useDispatch();
  const { coachesDetails, loading, error, domainsDetails, subdomainsDetails, addnewCoach, updateCoachDetails, deleteCoach } = useCoachesList();

  const coaches = coachesDetails.coaches;
  const domains = domainsDetails.domains;
  const subdomains = subdomainsDetails.subdomains;

  // drawer and other state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [errors, setErrors] = useState({});

  // Form states
  const [coachForm, setCoachForm] = useState({
    name: '',
    email: '',
    contactNumber: '',
    experience: '',
    domainId: '',
    subdomainId: '',
    professionalTitle: '',
    bio: '',
    profilePicture: null
  })

  // handle change 
  const handleChange = (e) => {
    if (e.target.name == "domainId") {
      const selectedDomainId = e.target.value;
      if (selectedDomainId) dispatch(fetchAllSubDomainsAPI({ domainId: selectedDomainId }));
    }
    setCoachForm({ ...coachForm, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setCoachForm({
      name: '',
      email: '',
      contactNumber: '',
      experience: '',
      domainId: '',
      subdomainId: '',
      professionalTitle: '',
      bio: '',
      profilePicture: null
    })
    setErrors({});
    setEditingCoach(false);
    setShowForm(false);
    setIsDrawerOpen(false);
  };

  const handleAddCoach = () => {
    setEditingCoach(false);
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
    setCoachForm({
      name: coach.name,
      email: coach.email,
      contactNumber: coach.contact_number,
      experience: coach.experience,
      domainId: coach.domain_id,
      subdomainId: coach.subdomain_id,
      professionalTitle: coach.professional_title,
      bio: coach.bio,
      profilePicture: coach.profile_image_url,
    })
    setErrors({});
    setShowForm(true);

    if (coach.domain_id) {
      dispatch(fetchAllSubDomainsAPI({ domainId: coach.domain_id }));
    }

    setIsDrawerOpen(true);
  };

  const handleDeleteCoach = (coachId) => {
    deleteCoach(coachId);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!coachForm.name.trim()) {
      errors.name = "Coach name is required.";
      isValid = false;
    }

    if (!coachForm.email.trim()) {
      errors.email = "Email is required.";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(coachForm.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!coachForm.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required.";
    }
    else if (!/^\d{10}$/.test(coachForm.contactNumber)) {
      errors.contactNumber = "Contact number must be exactly 10 digits (no spaces or special characters).";
    }


    if (!coachForm.experience.trim()) {
      errors.experience = "Experience is required.";
      isValid = false;
    }

    if (!coachForm.professionalTitle.trim()) {
      errors.professionalTitle = "professional title name is required.";
      isValid = false;
    }

    if (!coachForm.domainId) {
      errors.domainId = "Select the domain is required.";
      isValid = false;
    }

    if (!coachForm.subdomainId) {
      errors.subdomainId = "Select the subdomain is required.";
      isValid = false;
    }

    if (!coachForm.bio.trim()) {
      errors.bio = "Coach bio is required.";
      isValid = false;
    }

    if (!coachForm.profilePicture) {
      errors.profilePicture = "Profile picture is required.";
      isValid = false;
    }

    return { errors, isValid };
  };

  const handleSaveCoach = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateForm();
    setErrors(errors);
    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", coachForm.name);
    formData.append("email", coachForm.email);
    formData.append("contact_number", coachForm.contactNumber);
    formData.append("experience", coachForm.experience);
    formData.append("domain_id", coachForm.domainId);
    formData.append("subdomain_id", coachForm.subdomainId);
    formData.append("professional_title", coachForm.professionalTitle);
    formData.append("bio", coachForm.bio);
    if (typeof coachForm.profilePicture === "object") formData.append("profile_picture", coachForm.profilePicture);

    if (editingCoach) {
      updateCoachDetails(editingCoach.coach_id, formData);
    } else {
      addnewCoach(formData);
    }
    resetForm();
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
      {error && <p className="text-red-500 text-center text-lg">Error: {error.message}</p>}

      {!loading && !error && coaches.length > 0 ? (
        <div className="space-y-6 max-w-6xl mx-auto">
          {coaches.map((coach) => (
            <div
              key={coach.coach_id}
              className="relative flex flex-col lg:flex-row  border border-gray-300 rounded-2xl p-6 hover:shadow-sm transition duration-300"
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
              <div className="absolute top-4 right-4 flex gap-3 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCoach(coach);
                  }}
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <SquarePen className="text-blue-600 dark:text-blue-300 w-5 h-5 sm:w-6 sm:h-6 m-auto cursor-pointer" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteCoach(coach.coach_id);
                  }}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Trash2 className="text-red-600 dark:text-red-300 w-5 h-5 sm:w-6 sm:h-6 m-auto cursor-pointer" />
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
        onClose={() => setIsDrawerOpen(false)}
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
          <form
            className="flex-1 overflow-y-auto space-y-4 pr-2 p-1"
            onSubmit={handleSaveCoach}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Coach Name */}
              <div>
                <label className="block font-medium mb-1">Coach Name</label>
                <input
                  type="text"
                  name="name"
                  value={coachForm.name}
                  onChange={handleChange}
                  placeholder="Enter the coach name"
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                />
                {errors.name && <p className="text-red-500 text-base mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={coachForm.email}
                  onChange={handleChange}
                  placeholder="Enter the email"
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                />
                {errors.email && <p className="text-red-500 text-base mt-1">{errors.email}</p>}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block font-medium mb-1">Contact Number</label>
                <input
                  type="number"
                  name="contactNumber"
                  value={coachForm.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-base mt-1">{errors.contactNumber}</p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="block font-medium mb-1">Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={coachForm.experience}
                  onChange={handleChange}
                  placeholder="Years of experience"
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                />
                {errors.experience && (
                  <p className="text-red-500 text-base mt-1">{errors.experience}</p>
                )}
              </div>

              {/* Professional Title */}
              <div>
                <label className="block font-medium mb-1">Professional Title</label>
                <input
                  type="text"
                  name="professionalTitle"
                  value={coachForm.professionalTitle}
                  onChange={handleChange}
                  placeholder="Enter professional title"
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                />
                {errors.professionalTitle && (
                  <p className="text-red-500 text-base mt-1">{errors.professionalTitle}</p>
                )}
              </div>

              {/* Domain */}
              <div>
                <label className="block font-medium mb-1">Domain</label>
                <select
                  name="domainId"
                  value={coachForm.domainId}
                  onChange={handleChange}
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                >
                  <option value="">Select Domain</option>
                  {domains?.map((d) => (
                    <option key={d.domain_id} value={d.domain_id}>
                      {d.domain_name}
                    </option>
                  ))}
                </select>
                {errors.domainId && (
                  <p className="text-red-500 text-base mt-1">{errors.domainId}</p>
                )}
              </div>

              {/* Subdomain */}
              <div>
                <label className="block font-medium mb-1">Sub Domain</label>
                <select
                  name="subdomainId"
                  value={coachForm.subdomainId}
                  onChange={handleChange}
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                >
                  <option value="">Select Subdomain</option>
                  {subdomains?.map((s) => (
                    <option key={s.subdomain_id} value={s.subdomain_id}>
                      {s.subdomain_name}
                    </option>
                  ))}
                </select>
                {errors.subdomainId && (
                  <p className="text-red-500 text-base mt-1">{errors.subdomainId}</p>
                )}
              </div>

              {/* Bio – Full width always */}
              <div className="col-span-1 lg:col-span-2">
                <label className="block font-medium mb-1">Coach Bio</label>
                <textarea
                  name="bio"
                  value={coachForm.bio}
                  onChange={handleChange}
                  placeholder="Enter bio"
                  className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`}
                />
                {errors.bio && <p className="text-red-500 text-base mt-1">{errors.bio}</p>}
              </div>

              {/* Profile Picture – Full width */}
              <div className="col-span-1 lg:col-span-2 mb-10">
                <label className="block font-medium mb-2">Upload Profile Picture</label>
                <FileUploaderWithPreview
                  imageFile={typeof coachForm.profilePicture === "object" ? coachForm.profilePicture : null}
                  imageUrl={typeof coachForm.profilePicture === "string" ? coachForm.profilePicture : null}
                  setImageFile={(file) =>
                    setCoachForm((prev) => ({ ...prev, profilePicture: file }))
                  }
                />
                {errors.profilePicture && (
                  <p className="text-red-500 text-base mt-1">{errors.profilePicture}</p>
                )}
              </div>
            </div>
          </form>
        ) : (
          <CoachInfo coach={selectedCoach} />
        )}
      </CustomDrawer>
    </div>
  );
};

export default CoachesList;