import React, { useState } from "react";
import useDomainsList from "./useDomainsList";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileUploaderWithPreview from "@/components/FileUploaderWithPreview/FileUploaderWithPreview";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const DomainsList = () => {
  const { domainsDetails, loading, error, addDomain, updateDomain, deleteDomain } = useDomainsList();
  const domains = domainsDetails.domains;

  // drawer state and other
  const [selectedDomainId, setSelectedDomainId] = useState(null);
  const [showSubDomains, setShowSubDomains] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState(null);
  const [errors, setErrors] = useState(false);

  // form state
  const [domainForm, setDomainForm] = useState({
    domainName: '',
    domainThumbnail: null
  })
  const resetForm = () => {
    setIsDrawerOpen(false);
    setEditingDomain(null);
    setDomainForm({
      domainName: '',
      domainThumbnail: null
    });
    setErrors({});
  }

  const navigate = useNavigate();

  const columns = [
    { header: "ID", accessor: "domain_id" },
    { header: "Domain Name", accessor: "domain_name" },
    { header: "Domain Thumbnail", accessor: "domain_thumbnail" },
  ];

  const openDrawerForEdit = (domain) => {
    setEditingDomain(domain);
    setDomainForm({
      domainName: domain.domain_name,
      domainThumbnail: domain.domain_thumbnail
    });
    setIsDrawerOpen(true);
  };

  const handleDomainClick = (domain) => {
    navigate(`/admin/domains/${domain.domain_id}/subdomains`, {
      state: { domainName: domain.domain_name },
    });
    setShowSubDomains(true);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!domainForm.domainName.trim()) {
      errors.domainName = "Domain name is required.";
      isValid = false;
    } else if (!/^[a-zA-Z ]+$/.test(domainForm.domainName)) {
      errors.domainName = "Name must only contain letters.";
      isValid = false;
    }

    // Domain Thumbnail
    if (!domainForm.domainThumbnail) {
      errors.domainThumbnail = "Domain thumbnail is required.";
      isValid = false;
    }
    return { errors, isValid };
  };

  const handleSaveDomain = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateForm();
    setErrors(errors);
    if (!isValid) return;

    const formData = new FormData();
    formData.append("domain_name", domainForm.domainName);
    if (typeof domainForm.domainThumbnail == "object") formData.append("domain_thumbnail", domainForm.domainThumbnail);

    if (editingDomain) {
      updateDomain(editingDomain.domain_id, formData);
      toast.success("Domain updated successfully!");
    } else {
      addDomain(formData);
      toast.success("New domain added successfully!");
    }

    setDomainForm({
      domainName: "",
      domainThumbnail: null
    })
    setIsDrawerOpen(false);
    setEditingDomain(null);
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:mx-10 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Domains
        </h1>
        <CustomButton
          onClick={() => {
            setIsDrawerOpen(true);
            setEditingDomain(null);
            setDomainForm({
              domainName: "",
              domainThumbnail: null
            });
          }}
          variant="dark"
        >
          Add Domain
        </CustomButton>
      </div>

      {/* Loading / Error States */}
      {loading && (
        <p className="text-center font-bold text-2xl text-gray-700 dark:text-gray-200">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center text-2xl">{error.message}</p>
      )}

      {/* Table Section */}
      {!loading && !error && (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md  transition-colors duration-300">
          <CustomTable
            columns={columns}
            data={domains}
            onEdit={openDrawerForEdit}
            onRowClick={handleDomainClick}
            onDelete={(row) => {
              const confirmDelete = window.confirm(
                `Are you sure you want to delete "${row.domain_name}"?`
              );
              if (confirmDelete) deleteDomain(row.domain_id);
            }}
          />
        </div>
      )}

      {/* Add/Edit Domain Drawer */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={() => resetForm()}
        title={editingDomain ? "Edit Domain" : "Add New Domain"}
      >
        <form
          className="space-y-5 max-h-[85vh]  px-2 sm:px-4
               scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600
               scrollbar-track-transparent"
          onSubmit={handleSaveDomain}
        >
          {/* Domain Name */}
          <div>
            <label className="block font-medium mb-1 text-gray-800 dark:text-gray-100">
              Domain Name
            </label>
            <input
              type="text"
              name="domainName"
              value={domainForm.domainName}
              onChange={(e) => setDomainForm((prev) => { return { ...prev, domainName: e.target.value } })}
              placeholder="Enter domain name"
              className={`w-full p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
            placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
               ${errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                }`}
            />
            {errors.domainName && (
              <p className="text-red-500 text-base mt-1">{errors.domainName}</p>
            )}
          </div>

          {/* Upload Thumbnail */}
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-100">
              Upload Domain Thumbnail
            </label>
            <FileUploaderWithPreview
              key={editingDomain ? editingDomain.domain_id : "new"} // 👈 forces re-render per domain
              imageFile={typeof domainForm.domainThumbnail == "object" ? domainForm.domainThumbnail : null}
              setImageFile={(file) =>
                setDomainForm((prev) => ({ ...prev, domainThumbnail: file }))
              }
              imageUrl={typeof domainForm.domainThumbnail == "string" ? domainForm.domainThumbnail : null}
              name="domainThumbnail"

            />
            {errors.domainThumbnail && (
              <p className="text-red-500 text-base mt-1">{errors.domainThumbnail}</p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-center sm:justify-end">
            <CustomButton
              variant="dark"
              type="submit"
              className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base"
            >
              Save
            </CustomButton>
          </div>
        </form>
      </CustomDrawer>

    </div>
  );
};

export default DomainsList;
