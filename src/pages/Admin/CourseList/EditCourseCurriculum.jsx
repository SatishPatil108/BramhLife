import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import FileUploaderWithPreview from "@/components/FileUploaderWithPreview/FileUploaderWithPreview";
import { validateForm } from "@/utils/validator";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditCourseCurriculum = ({ curriculumDetails, onClose, isDrawerOpen, isEditing, onSubmit }) => {

    // local form state
    const [curriculumData, setCurriculumData] = useState({
        header_type: "",
        sequence_no: "",
        title: "",
        description: "",
        video_id: "",
        video_url: "",
        thumbnail_file: null,
    });
    useEffect(() => {
        if (curriculumDetails) {
            setCurriculumData({
                header_type: curriculumDetails.header_type || "",
                sequence_no: curriculumDetails.sequence_no || "",
                title: curriculumDetails.title || "",
                description: curriculumDetails.description || "",
                video_id: curriculumDetails.video_id || "",
                video_url: curriculumDetails.video_url || "",
                thumbnail_file: curriculumDetails.thumbnail_url || null,
            });
        }
    }, [curriculumDetails]);
    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "thumbnail_file") {
            setCurriculumData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setCurriculumData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const trim = (val) => (typeof val === "string" ? val.trim() : val);
    const handleSubmit = () => {
        // Validate and create form data object to submit the form data
        const requiredFields = [
            { value: trim(curriculumData.header_type), label: "Header Type" },
            { value: trim(curriculumData.sequence_no), label: "Sequence No" },
            { value: trim(curriculumData.title), label: "Title" },
            { value: trim(curriculumData.description), label: "Description" },
            { value: trim(curriculumData.video_url), label: "Video URL" },

        ];
        if (!isEditing) {
            requiredFields.push(
                { value: curriculumData.thumbnail_file, label: "Thumbnail File" }
            );
        }
        if (validateForm(requiredFields)) {
            const formData = new FormData();
            formData.append("header_type", curriculumData.header_type);
            formData.append("sequence_no", curriculumData.sequence_no);
            formData.append("title", curriculumData.title);
            formData.append("description", curriculumData.description);
            formData.append("video_url", curriculumData.video_url);
            if (isEditing)
                formData.append("video_id", curriculumData.video_id);
            if (curriculumData.thumbnail_file instanceof File) {
                formData.append("thumbnail_file", curriculumData.thumbnail_file);
            }

            // clear the form data
            setCurriculumData({
                header_type: "",
                sequence_no: "",
                title: "",
                description: "",
                video_id: "",
                video_url: "",
                thumbnail_file: null,
            });
            onSubmit(formData);
        }
    };
    return (
        <CustomDrawer
            title={isEditing ? "Edit Course Curriculum" : "Add Course Curriculum"}
            isOpen={isDrawerOpen}
            onClose={onClose}
            footer={
                <div className="flex justify-end gap-2 sm:gap-3">
                    <CustomButton
                        onClick={onClose}
                        className="px-3 sm:px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md transition"
                    >
                        Cancel
                    </CustomButton>
                    <CustomButton
                        onClick={handleSubmit}
                        className="px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition"
                    >
                        Save
                    </CustomButton>
                </div>
            }
        >
            <form className="space-y-6 text-gray-800 dark:text-gray-100">
                <h3 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-1">
                    Curriculum Info
                </h3>

                <div>
                    <label className="block text-sm font-medium">
                        Header Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="header_type"
                        value={curriculumData?.header_type || ""}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none
                 focus:ring-2 focus:ring-purple-500"
                        required
                    >
                        <option value="">-- Select Header Type --</option>
                        <option value="Section">Section</option>
                        <option value="Chapter">Chapter</option>
                        <option value="Lesson">Lesson</option>
                    </select>
                </div>

                {[
                    { name: "sequence_no", type: "number", label: "Sequence No" },
                    { name: "title", type: "text", label: "Curriculum Title" },
                    { name: "description", type: "text", label: "Curriculum Description" },
                    { name: "video_url", type: "text", label: "Curriculum Video URL" },
                    { name: "thumbnail_file", type: "file", label: "Curriculum Thumbnail" },
                ].map(({ name, type, label }) => (
                    <div key={name}>
                        <label className="block text-sm font-medium">
                            {label}
                            {!isEditing ? <span className="text-red-500"> *</span> : (name !== "thumbnail_file") ? <span className="text-red-500"> *</span> : <span> (optional)</span>}
                        </label>

                        {type === "textarea" ? (
                            <textarea
                                name={name}
                                value={curriculumData[name] || ""}
                                onChange={handleInputChange}
                                rows="5"
                                required={name !== "thumbnail_file"}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        ) : type === "file" ? (
                            <FileUploaderWithPreview
                                key={curriculumData.video_id || "new"}
                                imageFile={typeof curriculumData[name] === "object" ? curriculumData[name] : null}
                                imageUrl={typeof curriculumData[name] === "string" ? curriculumData[name] : null}
                                setImageFile={(file) =>
                                    handleInputChange({ target: { name, files: [file] } })
                                }
                            />
                        ) : (
                            <input
                                type={type}
                                name={name}
                                value={curriculumData[name] || ""}
                                {...(type === "number" ? { onWheel: (e) => e.target.blur() } : {})}
                                onChange={handleInputChange}
                                required={name !== "thumbnail_file"}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        )}
                    </div>
                ))}
            </form>



        </CustomDrawer>
    );
};

export default EditCourseCurriculum;
