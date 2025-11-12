// src/store/feature/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCoursesCategoriesAPI,
  fetchSubcategoriesAPI,
  fetchCoachesVideosAPI,
  fetchCoachDetailsAPI,
  fetchCoachProfileAPI,
  fetchCourseDetailsById,
  enrollInCourseAPI,
  fetchMyCoursesThunk,
  fetchEnrolledCourseDetailsThunk,
  fetchUserDashboardDataAPI,
  fetchFAQsAPI,
  fetchAllCoursesFeedbackAPI,
  fetchCourseFeedbackById,
  postCourseFeedbackAPI,
  searchCoursesAPI,
  fetchCourseNamesAndCoachNamesAPI,
  fetchAllCoachesAPI
} from "./userThunk";


const initialState = {
  isLoading: false,
  coursesCategories: [],
  subcategories: {},
  coachesVideos: [],
  coachDetails: null,
  coachProfile: null,
  courseDetails: null,
  coaches: [],
  enrolledCourses: [],
  myCourses: [],
  dashboardData: null,
  enrolledCourseDetails: null,
  totalCourses: 0,
  FAQs: [],
  allCoursesFeedback: [],
  error: null,
  courses: [],// 29-09-25 
  courseNames: [],
  coachNames: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearSubcategories: (state) => {
      state.subcategories = [];
    },
    resetCoachesVideos: (state) => {
      state.coachesVideos = [];
      state.isLoading = false;
      state.error = null;
    },
    clearEnrolledCourseDetails: (state) => {
      state.enrolledCourseDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Courses Categories

      .addCase(fetchCoursesCategoriesAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoursesCategoriesAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.coursesCategories = res.data;
        } else {
          state.error = res?.message || "Failed to fetch course categories";
        }
      })
      .addCase(fetchCoursesCategoriesAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Subcategories

      .addCase(fetchSubcategoriesAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSubcategoriesAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data && res.data.length != 0) {
          state.subcategories[res?.data[0]?.domain_id] = res.data;
        } else {
          state.subcategories[res?.domain_id] = [];
          state.error = res?.message || "Failed to fetch subcategories";
        }
      })
      .addCase(fetchSubcategoriesAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Coaches / Videos

      .addCase(fetchCoachesVideosAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.coachesVideos = []
      })
      .addCase(fetchCoachesVideosAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.coachesVideos = res.data;
        } else {
          state.error = res?.message || "Failed to fetch coaches/videos";
        }
      })
      .addCase(fetchCoachesVideosAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Coach details

      .addCase(fetchCoachDetailsAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoachDetailsAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.coachDetails = res.data;
        } else {
          state.error = res?.message || "Failed to fetch coach details";
        }
      })
      .addCase(fetchCoachDetailsAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Coach profile

      .addCase(fetchCoachProfileAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCoachProfileAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.coachProfile = res.data;
        } else {
          state.error = res?.message || "Failed to fetch coach profile";
        }
      })
      .addCase(fetchCoachProfileAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Course details

      .addCase(fetchCourseDetailsById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetailsById.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.courseDetails = res.data;
        } else {
          state.error = res?.message || "Failed to fetch course details";
        }
      })
      .addCase(fetchCourseDetailsById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // All coaches

      .addCase(fetchAllCoachesAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCoachesAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.coaches = res.data;
        } else {
          state.error = res?.message || "Failed to fetch all coaches";
        }
      })
      .addCase(fetchAllCoachesAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Enroll in a course

      .addCase(enrollInCourseAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(enrollInCourseAPI.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(enrollInCourseAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //  Fetch enrolled courses (list)

      .addCase(fetchMyCoursesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyCoursesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (Array.isArray(res?.data)) {
          state.myCourses = res.data;
          state.totalCourses = res.data.length;
        } else {
          state.error = res?.message || "Failed to fetch enrolled courses";
          state.myCourses = [];
          state.totalCourses = 0;
        }
      })
      .addCase(fetchMyCoursesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //  Fetch enrolled course details (single course)

      .addCase(fetchEnrolledCourseDetailsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchEnrolledCourseDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.enrolledCourseDetails = res.data;
        } else {
          state.error = res?.message || "Failed to fetch course details";
        }
      })

      .addCase(fetchEnrolledCourseDetailsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      //get user dashboard data

      .addCase(fetchUserDashboardDataAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDashboardDataAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.dashboardData = res.data;
        } else {
          state.error = res?.message || "Failed to fetch dashboard data";
        }
      })
      .addCase(fetchUserDashboardDataAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //fetch FAQ list

      .addCase(fetchFAQsAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFAQsAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;

        if (Array.isArray(res?.data)) {
          state.FAQs = res.data;
        } else {
          state.error = res?.message || "Failed to fetch FAQs";
        }
      })

      .addCase(fetchFAQsAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //get all courses feedback with pagination

      .addCase(fetchAllCoursesFeedbackAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCoursesFeedbackAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.allCoursesFeedback = res.data;
        } else {
          state.error = res?.message || "Failed to fetch all courses feedback";
        }
      })
      .addCase(fetchAllCoursesFeedbackAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      //get course feedback by course ID with pagination

      .addCase(fetchCourseFeedbackById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(fetchCourseFeedbackById.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;

        // Handle both cases: res = { response_code, message, data } OR res = { data: { response_code, message, data } }
        const feedbacks = res?.data?.data || res?.data || [];

        if (feedbacks.length > 0) {
          state.allCoursesFeedback = feedbacks;
          state.error = null;
        } else {
          state.allCoursesFeedback = [];
          state.error = res?.message || "No feedback found";
        }
      })

      .addCase(fetchCourseFeedbackById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      //post course feedback
      .addCase(postCourseFeedbackAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postCourseFeedbackAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;

        if (res?.response_code === 1) {
          // add new feedback to the list
          if (res?.data) {
            state.allCoursesFeedback = [
              res.data,
              ...(state.allCoursesFeedback || []),
            ];
          }
        } else {
          state.error = res?.message || "Failed to post feedback";
        }
      })
      .addCase(postCourseFeedbackAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      //search course
      .addCase(searchCoursesAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchCoursesAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;
        if (res?.data) {
          state.courses = res.data;
        } else {
          state.error = res?.message || "Failed to search courses";
        }
      })
      .addCase(searchCoursesAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      //  fetch coach names and course names
      .addCase(fetchCourseNamesAndCoachNamesAPI.pending, (state) => {
        state.coachNames = [];
        state.courseNames = [];
      })
      .addCase(fetchCourseNamesAndCoachNamesAPI.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.coachNames = action.payload.coach_names;
        state.courseNames = action.payload.course_names;
      })
      .addCase(fetchCourseNamesAndCoachNamesAPI.rejected, (state) => {
        state.coachNames = [];
        state.courseNames = [];
      });
  },
});

export const {
  clearUserError,
  clearSubcategories,
  resetCoachesVideos,
  clearEnrolledCourseDetails,
} = userSlice.actions;

export default userSlice.reducer;
