import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDrawer from "@/components/CustomDrawer";
import CustomButton from "@/components/CustomButton";
import useDomainData from "./useDomainData";
import { fetchCoachesDropdownAPI } from "@/store/feature/admin";
import FileUploaderWithPreview from "@/components/FileUploaderWithPreview/FileUploaderWithPreview";
import { toast } from "react-toastify";
import { validateForm } from "@/utils/validator";

const EditCourse = ({ courseDetails, isDrawerOpen, onClose, onSubmit }) => {
  const { domains, subdomains, fetchSubdomains } = useDomainData();
  const coachesList = useSelector((state) => state.admin.coachesList || []);
  const dispatch = useDispatch();

  // Local form state
  const [courseData, setCourseData] = useState({});
  const [introVideoData, setIntroVideoData] = useState({});

  // Load data on drawer open
  useEffect(() => {
    if (courseDetails) {
      dispatch(fetchCoachesDropdownAPI());
      fetchSubdomains(courseDetails?.intro_video?.domain_id);

      setCourseData({
        course_name: courseDetails?.course_name || "",
        target_audience: courseDetails?.target_audience || "",
        learning_outcomes: courseDetails?.learning_outcomes || "",
        curriculum_description: courseDetails?.curriculum_description || "",
        coach_id: courseDetails?.coach_id || "",
        durationHours: String(parseInt(courseDetails?.duration?.split(" ")[0])) || "",
        durationMinutes: String(parseInt(courseDetails?.duration?.split(" ")[1])) || "",
      });

      setIntroVideoData({
        video_id: courseDetails?.intro_video?.id || "",
        domain_id: courseDetails?.intro_video?.domain_id || "",
        subdomain_id: courseDetails?.intro_video?.subdomain_id || "",
        title: courseDetails?.intro_video?.title || "",
        description: courseDetails?.intro_video?.description || "",
        video_url: courseDetails?.intro_video?.video_url || "",
        thumbnail_file: courseDetails?.intro_video?.thumbnail_url || null,
      });
    }
  }, [courseDetails, dispatch, fetchSubdomains]);

  // Handle course field changes
  const handleCourseDataChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle intro video field changes
  const handleIntroVideoDataChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail_file") {
      setIntroVideoData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setIntroVideoData((prev) => ({ ...prev, [name]: value }));
    }

    // Fetch subdomains when domain changes
    if (name === "domain_id") {
      fetchSubdomains(value);
      setIntroVideoData((prev) => ({ ...prev, subdomain_id: "" }));
    }
  };



  // ✅ Save handler
  const trim = (val) => (typeof val === "string" ? val.trim() : val);
  const handleSave = () => {
    const requiredFields = [
      { value: trim(courseData.course_name), label: "Course Name" },
      { value: trim(courseData.coach_id), label: "Coach" },
      { value: trim(courseData.target_audience), label: "Target Audience" },
      { value: trim(courseData.learning_outcomes), label: "Learning Outcomes" },
      { value: trim(courseData.curriculum_description), label: "Overview" },
      { value: trim(courseData.durationHours), label: "Duration Hours" },
      { value: trim(courseData.durationMinutes), label: "Duration Minutes" },
      { value: trim(introVideoData.domain_id), label: "Domain" },
      { value: trim(introVideoData.subdomain_id), label: "Subdomain" },
      { value: trim(introVideoData.title), label: "Video Title" },
      { value: trim(introVideoData.description), label: "Video Description" },
      { value: trim(introVideoData.video_url), label: "Video URL" },
    ];
    if (!validateForm(requiredFields)) return;

    const formData = new FormData();

    // --- Append Course Info ---
    formData.append("course_name", courseData.course_name.trim());
    formData.append("target_audience", courseData.target_audience.trim());
    formData.append("learning_outcomes", courseData.learning_outcomes.trim());
    formData.append("curriculum_description", courseData.curriculum_description.trim());
    formData.append("coach_id", courseData.coach_id);
    formData.append("duration", `${courseData.durationHours || 0}h ${courseData.durationMinutes || 0}m`);

    // --- Append Intro Video Info ---
    formData.append("video_id", introVideoData.video_id);
    formData.append("domain_id", introVideoData.domain_id);
    formData.append("subdomain_id", introVideoData.subdomain_id);
    formData.append("title", introVideoData.title.trim());
    formData.append("description", introVideoData.description.trim());
    formData.append("video_url", introVideoData.video_url.trim());

    if (introVideoData.thumbnail_file instanceof File) {
      formData.append("thumbnail_file", introVideoData.thumbnail_file);
    }

    onSubmit(formData);

  };

  return (
    <CustomDrawer
      isOpen={isDrawerOpen}
      onClose={onClose}
      title="Edit Course"
      footer={
        <div className="flex justify-end gap-2 sm:gap-3">
          <CustomButton
            onClick={onClose}
            className="px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md transition"
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={handleSave}
            className="px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition"
          >
            Save
          </CustomButton>
        </div>
      }
    >
      <form className="space-y-6 text-gray-800 dark:text-gray-100">
        {/* --- Course Info --- */}
        <h3 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-1">
          Course Info
        </h3>

        {/* Domain & Subdomain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Domain */}
          <div>
            <label className="block text-sm font-medium">
              Domain <span className="text-red-500">*</span>
            </label>
            <select
              name="domain_id"
              value={introVideoData?.domain_id || ""}
              onChange={handleIntroVideoDataChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none
                   focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">-- Select Domain --</option>
              {domains.map((domain) => (
                <option key={domain.domain_id} value={domain.domain_id}>
                  {domain.domain_name}
                </option>
              ))}
            </select>
          </div>

          {/* Subdomain */}
          <div>
            <label className="block text-sm font-medium">
              Subdomain <span className="text-red-500">*</span>
            </label>
            <select
              name="subdomain_id"
              value={introVideoData?.subdomain_id || ""}
              onChange={handleIntroVideoDataChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none
                   focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">-- Select Subdomain --</option>
              {subdomains.length > 0 ? (
                subdomains.map((sub) => (
                  <option key={sub.subdomain_id} value={sub.subdomain_id}>
                    {sub.subdomain_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No subdomains available
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Coach */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Assign Coach <span className="text-red-500">*</span>
          </label>
          <select
            name="coach_id"
            value={courseData.coach_id || ""}
            onChange={handleCourseDataChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none
                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">-- Select Coach --</option>
            {coachesList.map((coach) => {
              const id = coach.id ?? coach.coach_id ?? coach._id;
              const name = coach.name ?? coach.full_name ?? coach.coach_name ?? "Unknown";
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Text Fields */}
        {[
          { label: "Course Name", name: "course_name" },
          { label: "Target Audience", name: "target_audience", type: "textarea" },
          { label: "Learning Outcomes", name: "learning_outcomes", type: "textarea" },
          { label: "Overview", name: "curriculum_description", type: "textarea" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium">
              {label} <span className="text-red-500">*</span>
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={courseData[name] || ""}
                onChange={handleCourseDataChange}
                rows="5"
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={courseData[name] || ""}
                onChange={handleCourseDataChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            )}
          </div>
        ))}

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Duration <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <div>
              <label className="block text-sm font-medium">Hours</label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                name="durationHours"
                value={courseData.durationHours || ""}
                onChange={handleCourseDataChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Minutes</label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()}
                name="durationMinutes"
                value={courseData.durationMinutes || ""}
                onChange={handleCourseDataChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* --- Video Details --- */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <h3 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-1">
          Video Details
        </h3>

        {[
          { name: "title", type: "text", label: "Video Title" },
          { name: "description", type: "textarea", label: "Video Description" },
          { name: "video_url", type: "text", label: "Video URL" },
          { name: "thumbnail_file", type: "file", label: "Video Thumbnail (Optional)" },
        ].map(({ name, type, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium">
              {label}
              {name !== "thumbnail_file" && <span className="text-red-500"> *</span>}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={introVideoData[name] || ""}
                onChange={handleIntroVideoDataChange}
                rows="5"
                required={name !== "thumbnail_file"}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            ) : type === "file" ? (
              <FileUploaderWithPreview
                key={introVideoData.video_id || "new"}
                imageFile={typeof introVideoData[name] === "object" ? introVideoData[name] : null}
                imageUrl={typeof introVideoData[name] === "string" ? introVideoData[name] : null}
                setImageFile={(file) =>
                  handleIntroVideoDataChange({ target: { name, files: [file] } })
                }
              />
            ) : (
              <input
                type={type}
                name={name}
                value={introVideoData[name] || ""}
                onChange={handleIntroVideoDataChange}
                required={name !== "thumbnail_file"}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            )}
          </div>
        ))}
      </form>

    </CustomDrawer>
  );
};

export default EditCourse;
