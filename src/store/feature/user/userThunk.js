// userThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "./userApi";

// Fetch all course categories 
export const fetchCoursesCategoriesAPI = createAsyncThunk(
  "user/fetchCoursesCategories",
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.fetchCoursesCategories();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } 
  }
);

// Fetch subcategories for a specific domain
export const fetchSubcategoriesAPI = createAsyncThunk(
  "user/fetchSubcategories",
  async ({ domainId, pageNo = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const response = await userAPI.fetchSubcategories(pageNo, pageSize, domainId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch coaches videos
export const fetchCoachesVideosAPI = createAsyncThunk(
  "user/fetchCoachesVideos",
  async ({ subdomainId, pageNo = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const response = await userAPI.fetchCoachesVideos(pageNo, pageSize, subdomainId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch coach details by video ID
export const fetchCoachDetailsAPI = createAsyncThunk(
  "user/fetchCoachDetails",
  async (videoId, thunkAPI) => {
    try {
      const response = await userAPI.fetchCoachDetails(videoId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch coach profile by coach ID
export const fetchCoachProfileAPI = createAsyncThunk(
  "user/fetchCoachProfile",
  async (coachId, thunkAPI) => {
    try {
      const response = await userAPI.fetchCoachProfile(coachId);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch course details by course ID
export const fetchCourseDetailsById = createAsyncThunk(
  "user/fetchCourseDetails",
  async (courseId, thunkAPI) => {
    try {
      const response = await userAPI.fetchCourseDetailsAPI(courseId);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch all coaches
export const fetchAllCoaches = createAsyncThunk(
  "user/fetchAllCoaches",
  async ({ pageNo = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const response = await userAPI.fetchAllCoachesAPI(pageNo, pageSize); 
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Enroll in a course
export const enrollInCourseAPI = createAsyncThunk(
  "user/enrollInCourse",
  async (courseId, thunkAPI) => {
    try {
      const response = await userAPI.enrollInCourseAPIById(courseId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch enrolled courses
export const fetchMyCoursesThunk = createAsyncThunk(
  "user/fetchMyCourses",
  async ({ pageNo = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const response = await userAPI.fetchMyCoursesAPI(pageNo, pageSize);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch enrolled course details
export const fetchEnrolledCourseDetailsThunk = createAsyncThunk(
  "user/fetchEnrolledCourseDetails",
  async (courseId, thunkAPI) => {
    try {
      const response = await userAPI.fetchEnrolledCourseDetailsAPI(courseId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//get user dashboard data
export const fetchUserDashboardDataAPI = createAsyncThunk(
  "user/fetchUserDashboardData",
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.fetchDashboardData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
//get frequently asked questions with pagination
export const fetchFAQsAPI = createAsyncThunk(
  "user/fetchFAQs",
  async ({ pageNo = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const response = await userAPI.fetchFAQList(pageNo, pageSize);
      return response;   
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//get all courses feedback with pagination
export const fetchAllCoursesFeedbackAPI = createAsyncThunk(
  "user/fetchAllCoursesFeedback",
  async ({ pageNo = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const response = await userAPI.fetchAllCourseFeedback(pageNo, pageSize);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//get course feedback by course ID with pagination
export const fetchCourseFeedbackById = createAsyncThunk(
  "user/fetchCourseFeedback",
  async ({ courseId, pageNo = 1, pageSize = 10 }, thunkAPI) => {
    try {
      const response = await userAPI.fetchCourseFeedback(courseId, pageNo, pageSize);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//post course feedback
export const postCourseFeedbackAPI = createAsyncThunk(
  "user/postCourseFeedback",
  async (feedbackData, thunkAPI) => {
    try {
      const response = await userAPI.postCourseFeedback(feedbackData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//search course
// thunk
export const searchCoursesAPI = createAsyncThunk(
  "user/searchCourses",
  async ({ pageNo = 1, pageSize = 10, searchData }, thunkAPI) => {
    try {
      // FIX: send searchQuery inside an object
      // console.log(searchQuery);
      const response = await userAPI.searchCourses(pageNo, pageSize, searchData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//fetch Course Names And Coach Names
// thunk
export const fetchCourseNamesAndCoachNamesAPI = createAsyncThunk(
  "user/fetchCourseNamesAndCoachNames",
  async (_, thunkAPI) => {
    try {

      const response = await userAPI.getCourseNamesAndCoachNames();

      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);