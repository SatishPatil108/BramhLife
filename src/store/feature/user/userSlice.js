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
  fetchAllCoachesAPI,
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
  myCourses: [],
  dashboardData: null,
  enrolledCourseDetails: null,
  totalCourses: 0,
  FAQs: [],
  allCoursesFeedback: [],
  courses: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearSubcategories: (state) => {
      state.subcategories = {};
    },
    resetCoachesVideos: (state) => {
      state.coachesVideos = [];
      state.error = null;
      state.isLoading = false;
    },
    clearEnrolledCourseDetails: (state) => {
      state.enrolledCourseDetails = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesCategoriesAPI.fulfilled, (state, action) => {
        const res = action.payload;
        state.coursesCategories = res?.data || [];
      })

      .addCase(fetchSubcategoriesAPI.fulfilled, (state, action) => {
        const res = action.payload;
        const domainId = res?.data?.[0]?.domain_id || res?.domain_id;
        state.subcategories[domainId] = res?.data || [];
      })

      .addCase(fetchCoachesVideosAPI.fulfilled, (state, action) => {
        state.coachesVideos = action.payload?.data || [];
      })

      .addCase(fetchCoachDetailsAPI.fulfilled, (state, action) => {
        state.coachDetails = action.payload?.data || null;
      })

      .addCase(fetchCoachProfileAPI.fulfilled, (state, action) => {
        state.coachProfile = action.payload?.data || null;
      })

      .addCase(fetchCourseDetailsById.fulfilled, (state, action) => {
        state.courseDetails = action.payload?.data || null;
      })

      .addCase(fetchAllCoachesAPI.fulfilled, (state, action) => {
        state.coaches = action.payload?.data || [];
      })

      .addCase(fetchMyCoursesThunk.fulfilled, (state, action) => {
        const data = action.payload?.data || [];
        state.myCourses = data;
        state.totalCourses = data.length;
      })

      .addCase(fetchEnrolledCourseDetailsThunk.fulfilled, (state, action) => {
        state.enrolledCourseDetails = action.payload?.data || null;
      })

      .addCase(fetchUserDashboardDataAPI.fulfilled, (state, action) => {
        state.dashboardData = action.payload?.data || null;
      })

      .addCase(fetchFAQsAPI.fulfilled, (state, action) => {
        state.FAQs = action.payload?.data || [];
      })

      .addCase(fetchAllCoursesFeedbackAPI.fulfilled, (state, action) => {
        state.allCoursesFeedback = action.payload?.data || [];
      })

      .addCase(fetchCourseFeedbackById.fulfilled, (state, action) => {
        const res = action.payload;
        const feedbacks = res?.data?.data || res?.data || [];
        state.allCoursesFeedback = feedbacks;
      })

      .addCase(postCourseFeedbackAPI.fulfilled, (state, action) => {
        const res = action.payload;
        if (res?.response_code === 1 && res?.data) {
          state.allCoursesFeedback = [res.data, ...(state.allCoursesFeedback || [])];
        }
      })

      .addCase(searchCoursesAPI.fulfilled, (state, action) => {
        state.courses = action.payload?.data || [];
      })

      // 🔥 Universal loaders
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const {
  clearUserError,
  clearSubcategories,
  resetCoachesVideos,
  clearEnrolledCourseDetails,
} = userSlice.actions;

export default userSlice.reducer;