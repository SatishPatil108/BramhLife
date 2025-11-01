import { useState } from "react";

const AddCourseInfo = ({
  courseData = {},
  setCourseData = () => {},
  coaches = [],
  loadingCoaches = false,
  domains = [],
  subdomains = [],
  fetchSubdomains = () => {},
}) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCourseData({
      ...courseData,
      [name]: files ? files[0] : value,
    });
  };

  const handleDomainChange = (e) => {
    const domainId = Number(e.target.value);
    setCourseData((prev) => ({ ...prev, domain: domainId, subdomain: "" }));
    fetchSubdomains(domainId);
  };

  const inputClass =
    "w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
        Add Course
      </h1>

      <div className="space-y-5">
        {/* Domain & Subdomain */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Domain
            </label>
            <select
              name="domain"
              value={courseData.domain ?? ""}
              onChange={handleDomainChange}
              className={`${inputClass} ${errors.domain ? "border-red-500" : ""}`}
            >
              <option value="">Select Domain</option>
              {domains.map((d) => (
                <option key={d.domain_id} value={d.domain_id}>
                  {d.domain_name}
                </option>
              ))}
            </select>
            {errors.domain && (
              <p className="text-red-500 text-sm mt-1">{errors.domain}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              Subdomain
            </label>
            <select
              name="subdomain"
              value={courseData.subdomain ?? ""}
              onChange={handleChange}
              className={`${inputClass} ${errors.subdomain ? "border-red-500" : ""}`}
              disabled={!courseData.domain}
            >
              <option value="">Select Subdomain</option>
              {subdomains
                .filter((sub) => sub.domain_id === Number(courseData.domain))
                .map((sub) => (
                  <option key={sub.subdomain_id} value={sub.subdomain_id}>
                    {sub.subdomain_name}
                  </option>
                ))}
            </select>
            {errors.subdomain && (
              <p className="text-red-500 text-sm mt-1">{errors.subdomain}</p>
            )}
          </div>
        </div>

        {/* Coach */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
            Coach
          </label>
          <select
            name="coachId"
            value={courseData.coachId ?? ""}
            onChange={handleChange}
            className={`${inputClass} ${errors.coach ? "border-red-500" : ""}`}
          >
            <option value="">Select Coach</option>
            {coaches.map((coach) => {
              const id = coach.id ?? coach.coach_id ?? coach._id;
              const name =
                coach.name ?? coach.full_name ?? coach.coach_name ?? "Unknown";
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
          {errors.coach && (
            <p className="text-red-500 text-sm mt-1">{errors.coach}</p>
          )}
        </div>

        {/* Text Fields */}
        {[
          { label: "Course Name", name: "courseName" },
          { label: "Targeted Audience", name: "targetedAudience" },
          { label: "Learning Outcome", name: "learningOutcome" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              {f.label}
            </label>
            <input
              type="text"
              name={f.name}
              value={courseData[f.name] ?? ""}
              onChange={handleChange}
              className={`${inputClass} ${errors[f.name] ? "border-red-500" : ""}`}
            />
            {errors[f.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[f.name]}</p>
            )}
          </div>
        ))}

        {/* Curriculum */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
            Curriculum Description
          </label>
          <textarea
            name="curriculumDesc"
            value={courseData.curriculumDesc ?? ""}
            onChange={handleChange}
            className={`${inputClass} h-28 resize-none ${
              errors.curriculumDesc ? "border-red-500" : ""
            }`}
          />
          {errors.curriculumDesc && (
            <p className="text-red-500 text-sm mt-1">{errors.curriculumDesc}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="font-medium text-gray-700 dark:text-gray-200">
            Course Duration
          </label>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <div className="flex items-center gap-2">
              <span>Hours:</span>
              <input
                type="number"
                min={0}
                name="courseDurationHours"
                value={courseData.courseDurationHours ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="flex items-center gap-2">
              <span>Minutes:</span>
              <input
                type="number"
                min={0}
                name="courseDurationMinutes"
                value={courseData.courseDurationMinutes ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-8">
          Intro Video
        </h2>

        {[
          { label: "Video Title", name: "videoTitle" },
          { label: "Video Description", name: "videoDesc", type: "textarea" },
          { label: "Video URL", name: "videoUrl" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                name={f.name}
                value={courseData[f.name] ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            ) : (
              <input
                type="text"
                name={f.name}
                value={courseData[f.name] ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            )}
          </div>
        ))}

        {/* Thumbnail Upload */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
            Video Thumbnail
          </label>
          <input
            type="file"
            name="videoThumbnail"
            onChange={handleChange}
            className={inputClass}
          />
          {courseData.videoThumbnail && (
            <a
              href={URL.createObjectURL(courseData.videoThumbnail)}
              target="_blank"
            >
              <img
                src={URL.createObjectURL(courseData.videoThumbnail)}
                alt="Thumbnail Preview"
                className="w-32 h-32 mt-2 object-cover border rounded-lg shadow-md"
              />
            </a>
          )}
        </div>

        {/* Video Duration */}
        <div>
          <label className="font-medium text-gray-700 dark:text-gray-200">
            Video Duration
          </label>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <div className="flex items-center gap-2">
              <span>Minutes:</span>
              <input
                type="number"
                min={0}
                name="videoDurationMinutes"
                value={courseData.videoDurationMinutes ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div className="flex items-center gap-2">
              <span>Seconds:</span>
              <input
                type="number"
                min={0}
                name="videoDurationSeconds"
                value={courseData.videoDurationSeconds ?? ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Sequence */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
            Video Sequence No
          </label>
          <input
            type="number"
            name="videoSequenceNo"
            value={courseData.videoSequenceNo ?? ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCourseInfo;
