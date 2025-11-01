import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useSubDomainsList from "./useSubDomainsList";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const SubDomainsList = () => {
  const location = useLocation();
  const domainName = location.state.domainName;
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
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [editingSubdomain, setEditingSubdomain] = useState(null);
  const [subdomainThumbnail, setSubdomainThumbnail] = useState(null);
  const [subdomainThumbnailUrl, setSubdomainThumbnailUrl] = useState(null);
  const [errors, setErrors] = useState(false);

  // Table columns
  const columns = [
    { header: "ID", accessor: "subdomain_id" },
    { header: "Subdomain Name", accessor: "subdomain_name" },
    { header: "Difficulty Level", accessor: "progressive_difficulty" },
    { header: "Thumbnail", accessor: "subdomain_thumbnail" },
  ];

  // Validation
  const validateForm = () => {
    let isValid = true;
    const errs = {};
    if (!subdomainName.trim()) {
      errs.name = "Subdomain name is required.";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(subdomainName)) {
      errs.name = "Name must only contain letters.";
      isValid = false;
    }
    return { errors: errs, isValid };
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
    formData.append("subdomain_thumbnail", subdomainThumbnail);

    if (editingSubdomain) {
      updateSubDomain(editingSubdomain.subdomain_id, formData);
      toast.success("Updated subdomain successfully!");
    } else {
      addSubDomain(formData);
      toast.info("New Subdomain added successfully! 👋", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    setIsDrawerOpen(false);
    setSubdomainName("");
    setDifficultyLevel(1);
    setEditingSubdomain(null);
    setSubdomainThumbnail(null);
    setSubdomainThumbnailUrl(null);
  };

  const openDrawerForEdit = (subdomain) => {
    setEditingSubdomain(subdomain);
    setSubdomainName(subdomain.subdomain_name);
    setDifficultyLevel(subdomain.progressive_difficulty);
    setSubdomainThumbnailUrl(subdomain.subdomain_thumbnail);
    setIsDrawerOpen(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center sm:text-left">
          Subdomains for <span className="text-purple-600">{domainName}</span>
        </h2>

        <CustomButton
          onClick={() => {
            setIsDrawerOpen(true);
            setEditingSubdomain(null);
            setSubdomainName("");
            setDifficultyLevel(1);
            setSubdomainThumbnailUrl(null);
          }}
          variant="dark"
        >
          + Add Subdomain
        </CustomButton>
      </div>

      {/* Table or Loading/Error */}
      {loading && (
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-red-500 text-center font-bold">
          Error: {error.message || error}
        </p>
      )}

      {!loading && subdomains.length > 0 && (
        <CustomTable
          columns={columns}
          data={subdomains}
          onEdit={openDrawerForEdit}
          onDelete={(row) => {
            if (
              window.confirm(
                `Are you sure you want to delete "${row.subdomain_name}"?`
              )
            ) {
              deleteSubdomain(row.subdomain_id);
            }
          }}
        />
      )}

      {/* Drawer Form */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingSubdomain(null);
        }}
        title={editingSubdomain ? "Edit Subdomain" : "Add New Subdomain"}
        width="90%"
      >
        <form
          className="space-y-4 sm:space-y-6 text-gray-800 dark:text-gray-100"
          onSubmit={handleSaveSubdomain}
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Subdomain Name
            </label>
            <input
              type="text"
              value={subdomainName}
              onChange={(e) => setSubdomainName(e.target.value)}
              placeholder="Enter subdomain name"
              className={`w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition 
              dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600
              ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Difficulty Level
            </label>
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(Number(e.target.value))}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:ring-purple-500"
            >
              <option value={1}>1 - Easy</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - Hard</option>
            </select>
          </div>

          {/* Upload */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Subdomain Thumbnail
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-purple-500 dark:border-gray-600 dark:hover:border-purple-400 transition-colors duration-300">
              <span className="text-gray-500 dark:text-gray-300">
                Click to choose an image
              </span>
              <input
                type="file"
                name="subdomainThumbnail"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSubdomainThumbnail(e.target.files[0])}
              />
            </label>

            {(subdomainThumbnail || subdomainThumbnailUrl) && (
              <div className="mt-3">
                {subdomainThumbnail && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Selected File: {subdomainThumbnail.name}
                  </p>
                )}
                <img
                  src={
                    subdomainThumbnail
                      ? URL.createObjectURL(subdomainThumbnail)
                      : `${BASE_URL}${subdomainThumbnailUrl}`
                  }
                  alt="Preview"
                  className="w-24 h-24 object-cover mt-2 border rounded-md dark:border-gray-600"
                />
              </div>
            )}
          </div>

          {/* Save */}
          <CustomButton variant="dark" type="submit" className="w-full">
            Save
          </CustomButton>
        </form>
      </CustomDrawer>
    </div>
  );
};

export default SubDomainsList;
