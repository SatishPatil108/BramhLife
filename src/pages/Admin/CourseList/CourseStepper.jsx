import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import CustomButton from "@/components/CustomButton";
import AddCourseInfo from "./AddCourseInfo";
import AddCourseCurriculum from "./AddCourseCurriculum";
import useDomainData from "./useDomainData";
import { addNewCourseAPI } from "@/store/feature/admin";
import { toast } from "react-toastify";

const steps = ["Add Course", "Add Curriculum"];

const CourseStepper = ({ onClose, coaches = [], coachesLoading = false }) => {
  const dispatch = useDispatch();
  const { domains, subdomains, fetchSubdomains } = useDomainData();

  const [activeStep, setActiveStep] = useState(0);
  const [courseData, setCourseData] = useState({
    domain: "",
    subdomain: "",
    coachId: "",
    courseName: "",
    targetedAudience: "",
    learningOutcome: "",
    curriculumDesc: "",
    courseDurationHours: "",
    courseDurationMinutes: "",
    videoTitle: "",
    videoDesc: "",
    videoUrl: "",
    videoThumbnail: null,
    videoDurationMinutes: "",
    videoDurationSeconds: "",
    videoSequenceNo: "",
  });

  const [curriculums, setCurriculums] = useState([
    {
      header_type: "",
      sequence_no: "",
      title: "",
      description: "",
      video_url: "",
      thumbnail_file: null,
    },
  ]);

  const validateRequiredFields = (data, fields) =>
    fields.filter((f) => !data[f] && data[f] !== 0);

  const handleNext = async () => {
    try {
      if (activeStep === 0) {
        const missing = validateRequiredFields(courseData, Object.keys(courseData));
        if (missing.length) {
          toast.error(`Missing field: ${missing[0]}`, { autoClose: 1500 });
          return;
        }
        toast.success("Course info saved!", { autoClose: 1200 });
      }

      if (activeStep === 1) {
        for (const item of curriculums) {
          const missing = validateRequiredFields(item, Object.keys(item));
          if (missing.length) {
            toast.error(`Missing field: ${missing[0]}`, { autoClose: 1500 });
            return;
          }
        }

        const formData = new FormData();
        Object.entries(courseData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        curriculums.forEach((item, i) =>
          Object.entries(item).forEach(([key, value]) =>
            formData.append(`curriculums[${i}][${key}]`, value)
          )
        );

        await dispatch(addNewCourseAPI(formData)).unwrap();
        toast.success("Course created successfully!", { autoClose: 1500 });
        onClose();
      }

      if (activeStep < steps.length - 1) {
        setActiveStep((s) => s + 1);
      }
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Something went wrong. Please try again.", { autoClose: 1500 });
    }
  };

  const handleBack = () => setActiveStep((s) => Math.max(0, s - 1));

  return (
    <div className="w-full min-h-screen md:min-h-0 p-6 bg-white dark:bg-gray-900 rounded-xl transition-colors duration-300">
      {/* Stepper */}
      <div className="flex flex-wrap justify-center items-center mb-10 gap-4">
        {steps.map((label, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  index <= activeStep
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <p
                className={`mt-2 text-sm ${
                  index <= activeStep
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {label}
              </p>
            </div>

            {index < steps.length - 1 && (
              <FaArrowRight
                className={`mx-4 text-lg ${
                  index < activeStep
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-6">
        {activeStep === 0 ? (
          <AddCourseInfo
            courseData={courseData}
            setCourseData={setCourseData}
            coaches={coaches}
            loadingCoaches={coachesLoading}
            domains={domains}
            subdomains={subdomains}
            fetchSubdomains={fetchSubdomains}
          />
        ) : (
          <AddCourseCurriculum
            curriculums={curriculums}
            setCurriculum={setCurriculums}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-10">
        <CustomButton
          onClick={handleBack}
          disabled={activeStep === 0}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-all duration-300"
        >
          Back
        </CustomButton>

        <CustomButton
          onClick={handleNext}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all duration-300"
        >
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </CustomButton>
      </div>
    </div>
  );
};

export default CourseStepper;
