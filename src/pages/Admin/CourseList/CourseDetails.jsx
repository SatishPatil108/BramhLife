import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  deleteCourseAPI,
  fetchCourseDetailsAPI,
  updateCourseAPI,
  fetchCoachesDropdownAPI,
} from "@/store/feature/admin";
import { BookOpen, Users, Clock, Edit3, Trash2 } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import toast from "react-hot-toast";
import useDomainData from "./useDomainData";

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses, loading, error, coachesList } = useSelector(
    (state) => state.admin || {}
  );
  
  const { domains, subdomains, fetchSubdomains } = useDomainData();

  const courseDetails = courses.find(
    (c) => String(c.course_id) === String(courseId)
  );
  console.log("Course Details:", courseDetails);

   
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch course details on component mount
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetailsAPI(courseId));
    }
  }, [courseId, dispatch]);

  // Prefill form when course details load and fetch subdomains
  // useEffect(() => {
  //   if (courseDetails) {
  //     setFormData({
  //       course_name: courseDetails.course_name || "",
  //       target_audience: courseDetails.target_audience || "",
  //       learning_outcomes: courseDetails.learning_outcomes || "",
  //       curriculum_description: courseDetails.curriculum_description || "",
  //       duration: courseDetails.duration || "00:00:00",
  //       coach_id: courseDetails.coach_id || "",
  //       header_type: courseDetails.header_type || "",
  //       sequence_no: courseDetails.sequence_no || 0,
  //       title: courseDetails.title || "",
  //       description: courseDetails.description || "",
  //       curriculum_outline_id: courseDetails.curriculum_outline_id || 0,
  //       video_url: courseDetails.video_url || "",
  //       thumbnail_url: courseDetails.thumbnail_url || "",
  //       video_title: courseDetails.video_title || "",
  //       video_description: courseDetails.video_description || "",
  //       main_video_url: courseDetails.main_video_url || "",
  //       video_thumbnail_url: courseDetails.video_thumbnail_url || "",
  //       video_duration: courseDetails.video_duration || "00:00:00",
  //       video_sequence_no: courseDetails.video_sequence_no || 0,
  //       domain_id: courseDetails.domain_id || 0,
  //       subdomain_id: courseDetails.subdomain_id || 0,
  //     });

  //     // Fetch subdomains for the prefilled domain_id
  //     if (courseDetails.domain_id) {
  //       fetchSubdomains(courseDetails.domain_id);
  //     }
  //   }
  // }, [courseDetails, fetchSubdomains]);

  useEffect(() => {
  if (courseDetails) {
    setFormData({
      course_name: courseDetails.course_name || "",
      target_audience: courseDetails.target_audience || "",
      learning_outcomes: courseDetails.learning_outcomes || "",
      curriculum_description: courseDetails.curriculum_description || "",

      // ✅ Fix duration normalization
      duration: typeof courseDetails.duration === "object"
        ? `${courseDetails.duration.hours ?? 0}:${courseDetails.duration.minutes ?? 0}:${courseDetails.duration.seconds ?? 0}`
        : courseDetails.duration || "00:00:00",

      coach_id: courseDetails.coach_id || "",
      header_type: courseDetails.header_type || "",
      sequence_no: courseDetails.sequence_no || 0,
      title: courseDetails.title || "",
      description: courseDetails.description || "",
      curriculum_outline_id: courseDetails.curriculum_outline_id || 0,

      video_url: courseDetails.video_url || "",
      thumbnail_url: courseDetails.thumbnail_url || "",
      video_title: courseDetails.video_title || "",
      video_description: courseDetails.video_description || "",
      main_video_url: courseDetails.main_video_url || "",
     

      //  Same fix for video_duration
      video_duration: typeof courseDetails.video_duration === "object"
        ? `${courseDetails.video_duration.hours ?? 0}:${courseDetails.video_duration.minutes ?? 0}:${courseDetails.video_duration.seconds ?? 0}`
        : courseDetails.video_duration || "00:00:00",

      video_sequence_no: courseDetails.video_sequence_no || 0,
      domain_id: courseDetails.domain_id || 0,
      subdomain_id: courseDetails.subdomain_id || 0,
    });

    if (courseDetails.domain_id) {
      fetchSubdomains(courseDetails.domain_id);
    }
  }
}, [courseDetails, fetchSubdomains]);



  // Handlers
  // const handleEdit = () => {
  //   dispatch(fetchCoachesDropdownAPI());
  //   setIsDrawerOpen(true);
  // };

  const handleEdit = (video) => {
  dispatch(fetchCoachesDropdownAPI());
  setFormData({
    ...courseDetails,
    ...video, 
    curriculum_outline_id: video.curriculum_outline_id, 
  });
  setIsDrawerOpen(true);
};


  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const toastId = toast.loading("Deleting course...");
      dispatch(deleteCourseAPI(courseId))
        .unwrap()
        .then(() => {
          toast.success("Course deleted successfully ", { id: toastId });
          navigate("/admin/courses");
        })
        .catch(() => {
          toast.error("Failed to delete course ", { id: toastId });
        });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };

      // Conditionally trigger subdomain fetch only if the domain has changed
      if (name === "domain_id" && value !== prev.domain_id) {
        fetchSubdomains(value);
        // Reset subdomain_id when the domain changes to prevent stale data
        updatedFormData.subdomain_id = 0;
      }
      return updatedFormData;
    });
  };

  // const handleFormSubmit = () => {
  //   const toastId = toast.loading("Updating course...");
  //   dispatch(updateCourseAPI({ courseId, courseData: formData }))
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Course updated successfully ", { id: toastId });
  //       dispatch(fetchCourseDetailsAPI(courseId));
  //       setIsDrawerOpen(false);
  //     })
  //     .catch((err) => {
  //       toast.error(err || "Failed to update course ", { id: toastId });
  //     });
  // };

// const handleFormSubmit = () => {
//   const toastId = toast.loading("Updating course...");

//   // Build normalized payload
//   const normalizedData = {
//     course_name: formData.course_name || "",
//     target_audience: formData.target_audience || "",
//     learning_outcomes: formData.learning_outcomes || "",
//     curriculum_description: formData.curriculum_description || "",
//     duration: formData.duration || "00:00:00",

//     coach_id: Number(formData.coach_id) || null,

//     header_type: formData.header_type || "Chapter",
//     sequence_no: Number(formData.sequence_no) || 0,
//     title: formData.title || "",
//     description: formData.description || "",

//   curriculum_outline_id: Number(formData.curriculum_outline_id ?? 1),


//     video_url: formData.video_url || "",
//     thumbnail_url: formData.thumbnail_url || "",

//     domain_id: Number(formData.domain_id) || null,
//     subdomain_id: Number(formData.subdomain_id) || null,

//     video_title: formData.video_title || "",
//     video_description: formData.video_description || "",
//     main_video_url: formData.main_video_url || "",
   
//     video_duration: formData.video_duration || "00:00:00",
//     video_sequence_no: Number(formData.video_sequence_no) || 0,
//   };

//   dispatch(updateCourseAPI({ courseId, courseData: normalizedData }))
//     .unwrap()
//     .then(() => {
//       toast.success("Course updated successfully 🎉", { id: toastId });
//       dispatch(fetchCourseDetailsAPI(courseId));
//       setIsDrawerOpen(false);
//     })
//     .catch((err) => {
//       toast.error(err || "Failed to update course ❌", { id: toastId });
//     });
// };

const handleFormSubmit = () => {
  const toastId = toast.loading("Updating course...");

  const [h = 0, m = 0, s = 0] = (formData.duration || "00:00:00").split(":");
  const [vh = 0, vm = 0, vs = 0] = (formData.video_duration || "00:00:00").split(":");

  const normalizedData = {
    course_name: formData.course_name || "",
    target_audience: formData.target_audience || "",
    learning_outcomes: formData.learning_outcomes || "",
    curriculum_description: formData.curriculum_description || "",
    duration: { hours: Number(h), minutes: Number(m), seconds: Number(s) },

    coach_id: Number(formData.coach_id) || null,
    domain_id: Number(formData.domain_id) || null,
    subdomain_id: Number(formData.subdomain_id) || null,

    curriculum_outline: [
      {
        header_type: formData.header_type || "Chapter",
        sequence_no: Number(formData.sequence_no) || 0,
        title: formData.title || "",
        description: formData.description || "",
      },
    ],

    videos: [
      {
        curriculum_outline_id: Number(formData.curriculum_outline_id ?? 1),
        video_url: formData.video_url || "",
        thumbnail_url: formData.thumbnail_url || "",
        video_title: formData.video_title || "",
        video_description: formData.video_description || "",
        main_video_url: formData.main_video_url || "",
        video_duration: { hours: Number(vh), minutes: Number(vm), seconds: Number(vs) },
        video_sequence_no: Number(formData.video_sequence_no) || 0,
      },
    ],
  };

  dispatch(updateCourseAPI({ courseId, courseData: normalizedData }))
    .unwrap()
    .then(() => {
      toast.success("Course updated successfully 🎉", { id: toastId });
      dispatch(fetchCourseDetailsAPI(courseId));
      setIsDrawerOpen(false);
    })
    .catch((err) => {
      toast.error(err || "Failed to update course ❌", { id: toastId });
    });
};



  const getYouTubeEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  if (loading && !isDrawerOpen) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading course details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500 text-lg">No course found.</p>
      </div>
    );
  }

  const {
    course_name,
    target_audience,
    learning_outcomes,
    curriculum_description,
    duration,
    curriculum_outline = [],
    created_on,
  } = courseDetails;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex justify-end gap-3 mt-11">
        <CustomButton
          onClick={handleEdit}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </CustomButton>
        <CustomButton
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </CustomButton>
      </div>

      <div className="bg-gradient-to-r from-blue-800 to-teal-700 p-8 rounded-2xl shadow-lg text-white">
        <h1 className="text-3xl font-extrabold mb-2">{course_name}</h1>
        <p className="text-xs opacity-90">
          Created on {new Date(created_on).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-6 mt-3">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            {duration?.hours ?? 0}h {duration?.minutes ?? 0}m
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            For: Beginners & Developers
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold flex items-center text-gray-800 mb-2">
            <Users className="w-5 h-5 mr-2 text-teal-600" />
            Target Audience
          </h2>
          <p className="text-gray-600 whitespace-pre-line text-sm">
            {target_audience}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold flex items-center text-gray-800 mb-2">
            <BookOpen className="w-5 h-5 mr-2 text-teal-600" />
            Learning Outcomes
          </h2>
          <p className="text-gray-600 whitespace-pre-line text-sm">
            {learning_outcomes}
          </p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Overview</h2>
        <p className="text-gray-600 text-sm">{curriculum_description}</p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Curriculum Outline
        </h2>
        <div className="space-y-5">
          {curriculum_outline.map((item,index) => {
            const relatedVideos = courseDetails.videos?.filter(
              (vid) => vid.curriculum_outline_id === item.sequence_no
            );

            return (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 bg-gray-50 hover:shadow-md transition"
              >
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  {item.header_type} {item.sequence_no}
                  <br />
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                {relatedVideos && relatedVideos.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 mt-4">
                    {relatedVideos.map((video) => (
                      <div key={video.id} className="w-full">
                        <iframe
                          src={getYouTubeEmbedUrl(video.video_url)}
                          title="Course Video Player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full aspect-video rounded-lg shadow-md"
                        ></iframe>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Drawer with new fields */}
      <CustomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Edit Course"
        footer={
          <div className="flex justify-end gap-2">
            <CustomButton
              onClick={() => setIsDrawerOpen(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md transition-colors"
            >
              Cancel
            </CustomButton>
            <CustomButton
              onClick={handleFormSubmit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition-colors"
            >
              Save
            </CustomButton>
          </div>
        }
      >
       <form className="space-y-4">
  <h3 className="text-lg font-semibold text-gray-800">Course Info</h3>
  <div className="space-y-3">
    <div>
      <label className="block text-sm font-medium text-gray-700">Course Name</label>
      <input
        type="text"
        name="course_name"
        value={formData.course_name || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Target Audience</label>
      <textarea
        name="target_audience"
        value={formData.target_audience || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        rows="2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Learning Outcomes</label>
      <textarea
        name="learning_outcomes"
        value={formData.learning_outcomes || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        rows="2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Overview</label>
      <textarea
        name="curriculum_description"
        value={formData.curriculum_description || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        rows="3"
      />
    </div>
  </div>

  {/* Duration + Coach */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
      <input
        type="text"
        name="duration"
        value={formData.duration || "00:00:00"}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Assign Coach</label>
      <select
        name="coach_id"
        value={formData.coach_id || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
  </div>

  {/* Domain & Subdomain */}
  <hr className="my-4 border-t border-gray-200" />
  <h3 className="text-lg font-semibold text-gray-800">Domain & Subdomain</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Domain</label>
      <select
        name="domain_id"
        value={formData.domain_id || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">-- Select Domain --</option>
        {domains.map((domain) => (
          <option key={domain.domain_id} value={domain.domain_id}>
            {domain.domain_name}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Subdomain</label>
      <select
        name="subdomain_id"
        value={formData.subdomain_id || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">-- Select Subdomain --</option>
        {subdomains.length > 0 ? (
          subdomains.map((subdomain) => (
            <option key={subdomain.subdomain_id} value={subdomain.subdomain_id}>
              {subdomain.subdomain_name}
            </option>
          ))
        ) : (
          <option value="" disabled>No subdomains available</option>
        )}
      </select>
    </div>
  </div>

  {/* Curriculum Outline */}
  <hr className="my-4 border-t border-gray-200" />
  <h3 className="text-lg font-semibold text-gray-800">Curriculum Outline Details</h3>
  <div className="space-y-3">
    <div>
      <label className="block text-sm font-medium text-gray-700">Header Type</label>
      <input
        type="text"
        name="header_type"
        value={formData.header_type || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Sequence No</label>
      <input
        type="number"
        name="sequence_no"
        value={formData.sequence_no || 0}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        name="description"
        value={formData.description || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        rows="2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
      <input
        type="url"
        name="thumbnail_url"
        value={formData.thumbnail_url || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  </div>

  {/* Video Details */}
  <hr className="my-4 border-t border-gray-200" />
  <h3 className="text-lg font-semibold text-gray-800">Video Details</h3>
  <div className="space-y-3">
    <div>
      <label className="block text-sm font-medium text-gray-700">Main Video URL</label>
      <input
        type="url"
        name="main_video_url"
        value={formData.main_video_url || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Video Title</label>
      <input
        type="text"
        name="video_title"
        value={formData.video_title || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Video Description</label>
      <textarea
        name="video_description"
        value={formData.video_description || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
        rows="2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Video URL</label>
      <input
        type="url"
        name="video_url"
        value={formData.video_url || ""}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
 
    <div>
      <label className="block text-sm font-medium text-gray-700">Video Duration</label>
      <input
        type="text"
        name="video_duration"
        value={formData.video_duration || "00:00:00"}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Video Sequence No</label>
      <input
        type="number"
        name="video_sequence_no"
        value={formData.video_sequence_no || 0}
        onChange={handleFormChange}
        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  </div>
</form>

      </CustomDrawer>
    </div>
  );
};

export default CourseDetails;