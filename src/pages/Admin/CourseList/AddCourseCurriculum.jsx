import FileUploaderWithPreview from "@/components/FileUploaderWithPreview/FileUploaderWithPreview";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddCourseCurriculum = ({ curriculums = [], setCurriculum = () => { } }) => {
  const [localCurriculums, setLocalCurriculums] = useState(curriculums);

  // Sync with parent
  useEffect(() => {
    setLocalCurriculums(curriculums);
  }, [curriculums]);

  // Validate before adding another
  const validateCurriculum = (curriculum) => {
    const requiredFields = [
      "header_type",
      "sequence_no",
      "title",
      "description",
      "video_url",
      "thumbnail_file",
    ];
    for (const field of requiredFields) {
      if (!curriculum[field]) {
        toast.error(
          `Please fill the ${field.replace("_", " ")} before adding another.`,
          { position: "top-center", autoClose: 1500 }
        );
        return false;
      }
    }
    return true;
  };

  // Handle field change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...localCurriculums];
    updated[index][name] = value;
    setLocalCurriculums(updated);
    setCurriculum(updated);
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (index, e) => {
    const file = e.target.files[0];
    const updated = [...localCurriculums];
    updated[index].thumbnail_file = file;
    setLocalCurriculums(updated);
    setCurriculum(updated);
  };

  // Add new curriculum
  const handleAddCurriculum = () => {
    const last = localCurriculums[localCurriculums.length - 1];
    if (!validateCurriculum(last)) return;

    const newCurriculum = {
      header_type: "",
      sequence_no: "",
      title: "",
      description: "",
      video_url: "",
      thumbnail_file: null,
    };

    const updated = [...localCurriculums, newCurriculum];
    setLocalCurriculums(updated);
    setCurriculum(updated);

    toast.success("New curriculum added!", { autoClose: 1200 });
  };

  // Remove a curriculum
  const handleRemoveCurriculum = (index) => {
    const updated = localCurriculums.filter((_, i) => i !== index);
    setLocalCurriculums(updated);
    setCurriculum(updated);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
        Add Course Curriculum
      </h2>

      {localCurriculums.map((curriculum, index) => (
        <div
          key={index}
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-5 space-y-4 transition"
        >
          {/* Header Type */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Header Type <span className="text-red-500">*</span>
            </label>
            <select
              name="header_type"
              value={curriculum.header_type}
              onChange={(e) => handleChange(index, e)}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Header Type</option>
              <option value="Chapter">Chapter</option>
              <option value="Section">Section</option>
              <option value="Lesson">Lesson</option>
            </select>
          </div>

          {/* Sequence Number */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Sequence No <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              onWheel={(e) => e.target.blur()}
              name="sequence_no"
              value={curriculum.sequence_no}
              onChange={(e) => handleChange(index, e)}
              required
              placeholder="Enter sequence number"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={curriculum.title}
              onChange={(e) => handleChange(index, e)}
              required
              placeholder="Enter title"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={curriculum.description}
              onChange={(e) => handleChange(index, e)}
              required
              placeholder="Describe this chapter or section"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                     h-24 resize-none"
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Video URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="video_url"
              value={curriculum.video_url}
              onChange={(e) => handleChange(index, e)}
              required
              placeholder="Enter video URL"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Upload Thumbnail <span className="text-red-500">*</span>
            </label>
            <FileUploaderWithPreview
              imageFile={curriculum.thumbnail_file}
              setImageFile={(file) =>
                handleThumbnailChange(index, { target: { files: [file] } })
              }
              name="thumbnail_file"
            />
          </div>

          {/* Remove Button */}
          {localCurriculums.length > 1 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleRemoveCurriculum(index)}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                🗑 Remove This Curriculum
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Add Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleAddCurriculum}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700
                 text-white font-medium rounded-md transition"
        >
          + Add Another Curriculum
        </button>
      </div>
    </div>

  );
};

export default AddCourseCurriculum;
