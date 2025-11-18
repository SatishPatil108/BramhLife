import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useSubDomainsList from "./useSubDomainsList";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import { toast } from "react-toastify";
import FileUploaderWithPreview from "@/components/FileUploaderWithPreview/FileUploaderWithPreview";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const SubDomainsList = () => {
  const location = useLocation();
  const domainName = location.state?.domainName || "Unknown Domain";
  const { domainId } = useParams();

  const {
    subdomains,
    loading,
    error,
    addSubDomain,
    updateSubDomain,
    deleteSubdomain,
  } = useSubDomainsList(domainId);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [subdomainName, setSubdomainName] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState();
  const [editingSubdomain, setEditingSubdomain] = useState(null);
  const [subdomainThumbnail, setSubdomainThumbnail] = useState(null);
  const [subdomainThumbnailUrl, setSubdomainThumbnailUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const columns = [
    { header: "ID", accessor: "subdomain_id" },
    { header: "Subdomain Name", accessor: "subdomain_name" },
    { header: "Difficulty Level", accessor: "progressive_difficulty" },
    { header: "Thumbnail", accessor: "subdomain_thumbnail" },
  ];

  const resetForm = () => {
    setIsDrawerOpen(false);
    setEditingSubdomain(null);
    setSubdomainName("");
    setDifficultyLevel(0);
    setSubdomainThumbnail(null);
    setSubdomainThumbnailUrl(null);
    setErrors({});
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!subdomainName.trim()) {
      errors.subdomainName = "Subdomain name is required.";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(subdomainName)) {
      errors.subdomainName = "Name must only contain letters.";
      isValid = false;
    }

    //difficulity level
    if (!difficultyLevel) {
      errors.difficultyLevel = "Select the difficulty level.";
      isValid = false;
    }

    // Subdomain Thumbnail
    if (!subdomainThumbnail) {
      errors.subdomainThumbnail = "Subdomain thumbnail is required.";
      isValid = false;
    }

    return { errors, isValid };
  };

  const handleSaveSubdomain = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateForm();
    setErrors(errors);
    if (!isValid) return;

    const formData = new FormData();
    formData.append("domain_id", Number(domainId));
    formData.append("subdomain_name", subdomainName);
    formData.append("progressive_difficulty", difficultyLevel);
    if (subdomainThumbnail) formData.append("subdomain_thumbnail", subdomainThumbnail);

    if (editingSubdomain) {
      updateSubDomain(editingSubdomain.subdomain_id, formData);
      toast.success("Updated subdomain successfully!");
    } else {
      addSubDomain(formData);
      toast.info("New Subdomain added successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    resetForm();
  };

  const openDrawerForEdit = (subdomain) => {
    setEditingSubdomain(subdomain);
    setSubdomainName(subdomain.subdomain_name);
    setDifficultyLevel(subdomain.progressive_difficulty);
    setSubdomainThumbnailUrl(subdomain.subdomain_thumbnail);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-5 sm:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-all duration-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100">
          Subdomains of{" "}
          <span className="text-purple-600 dark:text-purple-400">
            {domainName}
          </span>
        </h2>

        <CustomButton
          onClick={() => {
            setIsDrawerOpen(true);
            setEditingSubdomain(null);
            setSubdomainName("");
            setDifficultyLevel(0);
            setSubdomainThumbnailUrl(null);
          }}
          variant="dark"
          className="shadow-md hover:shadow-lg"
        >
          Add Subdomain
        </CustomButton>
      </div>

      {/* Content */}
      {loading && (
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 font-semibold">
          Error: {error.message || error}
        </p>
      )}

      {!loading && subdomains.length > 0 && (
        <div className="p-4">
          <CustomTable
            columns={columns}
            data={subdomains}
            onEdit={openDrawerForEdit}
            onDelete={(row) => {
              if (window.confirm(`Delete "${row.subdomain_name}"?`)) {
                deleteSubdomain(row.subdomain_id);
              }
            }}
          />
        </div>
      )}

      {/* Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={resetForm}
        title={editingSubdomain ? "Edit Subdomain" : "Add New Subdomain"}
        width="90%"
      >
        <form
          className="space-y-6 text-gray-900 dark:text-gray-100"
          onSubmit={handleSaveSubdomain}
        >
          {/* Name */}
          <div>
            <label className="block text-base  mb-2">
              Subdomain Name
            </label>
            <input
              type="text"
              name="subdomainName"
              value={subdomainName}
              onChange={(e) => setSubdomainName(e.target.value)}
              placeholder="Enter subdomain name"
              className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
            placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
               ${errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                }`}
            />
            {errors.subdomainName && (
              <p className="text-red-500 text-base mt-1">{errors.subdomainName}</p>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-base mb-2">
              Difficulty Level
            </label>
            <select
              name="difficultyLevel"
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(Number(e.target.value))}
              className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
            placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
               ${errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                }`}
            >
              <option value={0}>Select the Difficulty Level</option>
              <option value={1}>1 - Easy</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - Hard</option>
            </select>
            {errors.difficultyLevel && (
              <p className="text-red-500 text-base mt-1">{errors.difficultyLevel}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-base mb-2">
              Subdomain Thumbnail
            </label>
            <div>
              <FileUploaderWithPreview
                imageFile={subdomainThumbnail}
                setImageFile={setSubdomainThumbnail}
                imageUrl={subdomainThumbnailUrl}
                name="subdomainThumbnail"
              />
              {errors.subdomainThumbnail && (
                <p className="text-red-500 text-base mt-1">{errors.subdomainThumbnail}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <CustomButton variant="dark" type="submit" className="w-full py-3 shadow-md hover:shadow-lg">
            Save
          </CustomButton>
        </form>
      </CustomDrawer>
    </div >
  );
};

export default SubDomainsList;
