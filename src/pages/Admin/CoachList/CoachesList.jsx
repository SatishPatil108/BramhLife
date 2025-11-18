import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useCoachesList from "./useCoachesList";
import {
  addNewCoachAPI,
  deleteCoachAPI,
  fetchAllSubDomainsAPI,
  updateCoachAPI,
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
  const { coaches, loading, error, domains, subdomains } = useCoachesList();
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
    setProfilePicture(coach.profile_image_url || null);
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
      const toastId = toast.loading('Deleting a coache...');

      dispatch(deleteCoachAPI(coachId)).then(() => {
        toast.update(toastId, {
          render: "Coach is Deleted Successfully 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        resetForm();
      }).catch((error) => {
        console.error(error);
        toast.update(toastId, {
          render: "Failed to Delete a Coach!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!name.trim()) {
      errors.name = "Coach name is required.";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!contactNumber.trim()) {
      errors.contactNumber = "Contact number is required.";
    }
    else if (!/^[0-9]{10}$/.test(contactNumber)) {
      errors.contactNumber = "Contact number must be 10 digits.";
    }

    if (!experience.trim()) {
      errors.experience = "Experience is required.";
      isValid = false;
    }

    if (!professionalTitle.trim()) {
      errors.professionalTitle = "professional title name is required.";
      isValid = false;
    }

    if (!domainId.trim()) {
      errors.domainId = "Select the domain is required.";
      isValid = false;
    }

    if (!subdomainId.trim()) {
      errors.subdomainId = "Select the subdomain is required.";
      isValid = false;
    }

    if (!bio.trim()) {
      errors.bio = "Coach bio is required.";
      isValid = false;
    }

    if (!profilePicture) {
      errors.profilePicture = "Profile picture is required.";
      isValid = false;
    }

    return { errors, isValid };
  };

  const handleSaveCoach = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateForm();
    setErrors(errors);

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
    if (typeof profilePicture === "object") formData.append("profile_picture", profilePicture);

    // if (editingCoach) {
    //   const toastId = toast.loading("Updating new coach............");

    //   dispatch(updateCoachAPI({ coachId: editingCoach.coach_id, coachData: formData })).then(() => {
    //     toast.update(toastId, {
    //       render: "Coach is Updated Successfully 🎉",
    //       type: "success",
    //       isLoading: false,
    //       autoClose: 3000,
    //     });
    //     resetForm();
    //   }).catch((error) => {
    //     console.error(error);
    //     toast.update(toastId, {
    //       render: "Failed to Update a Coach!",
    //       type: "error",
    //       isLoading: false,
    //       autoClose: 3000,
    //     })
    //   });
    // } else {
    //   const toastId = toast.loading("adding new coach............");
    //   dispatch(addNewCoachAPI(formData)).then(() => {
    //     toast.update(toastId, {
    //       render: "New Coach is added successfully 🎉",
    //       type: "success",
    //       isLoading: false,
    //       autoClose: 3000,
    //     });
    //     resetForm();
    //   }).catch((error) => {
    //     console.error(error);
    //     toast.update(toastId, {
    //       render: "Failed to add new Coach!",
    //       type: "error",
    //       isLoading: false,
    //       autoClose: 3000,
    //     });
    //   });
    // }
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
              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Coach Name
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter the coach name"
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} />
                {errors.name && <p className="text-red-500 text-base mt-1 px-2">{errors.name}</p>}

              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Email
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter the email"
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} />
                {errors.email && <p className="text-red-500 text-base mt-1 px-2">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Contact Number
                </label>
                <input type="number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Enter the contact number"
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} />
                {errors.contactNumber && <p className="text-red-500 text-base mt-1 px-2">{errors.contactNumber}</p>}

              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Experience
                </label>
                <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Enter the year of experience"
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} />
                {errors.experience && <p className="text-red-500 text-base mt-1 px-2">{errors.experience}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Professional Title
                </label>
                <input type="text" value={professionalTitle} onChange={(e) => setProfessionalTitle(e.target.value)} placeholder="Enter the professional title"
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} />
                {errors.professionalTitle && <p className="text-red-500 text-base mt-1 px-2">{errors.professionalTitle}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Domain
                </label>
                <select value={domainId} onChange={handleDomainChange}
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} >
                  <option value="">Select Domain</option>
                  {domains?.map((d) => (
                    <option key={d.domain_id} value={d.domain_id?.toString()}>{d.domain_name}</option>
                  ))}
                </select>
                {errors.domainId && <p className="text-red-500 text-base mt-1 px-2">{errors.domainId}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Sub Domain
                </label>
                <select value={subdomainId} onChange={(e) => setSubdomainId(e.target.value)}
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} >
                  <option value="">Select Subdomain</option>
                  {subdomains?.map((s) => (
                    <option key={s.subdomain_id} value={s.subdomain_id?.toString()}>{s.subdomain_name}</option>
                  ))}
                </select>
                {errors.subdomainId && <p className="text-red-500 text-base mt-1 px-2">{errors.subdomainId}</p>}
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
                  Coach Bio
                </label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter the coach bio"
                  className={`w-full mx-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                  placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                    ${errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                    }`} />

                {errors.bio && <p className="text-red-500 text-base mt-1 px-2">{errors.bio}</p>}
              </div>

              <div className="w-full mb-10">
                <label className="block font-medium mb-2">Upload Profile Picture</label>
                <FileUploaderWithPreview
                  imageFile={typeof profilePicture === "object" ? profilePicture : null}
                  imageUrl={typeof profilePicture === "string" ? profilePicture : null}
                  setImageFile={setProfilePicture}
                  name="profilePicture"
                />
                {errors.profilePicture && <p className="text-red-500 text-base mt-1 px-2">{errors.profilePicture}</p>}
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