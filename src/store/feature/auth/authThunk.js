// authThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./authApi";

// User login
export const loginUserAPI = createAsyncThunk(
  "auth/loginUserAPI",
  async (credentials, thunkAPI) => {
    try {
      const response = await authAPI.loginUser(credentials);

      if (response?.data?.token) {    
        localStorage.setItem("user_token", response.data.token);
        localStorage.setItem("isUserAuthenticated", "true");
        localStorage.setItem("user_info", JSON.stringify(response?.data));
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUserAPI = createAsyncThunk(
  "auth/registerUserAPI",
  async (credentials, thunkAPI) => {
    try {
      const response = await authAPI.registerUser(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Admin login
export const adminLoginAPI = createAsyncThunk(
  "auth/adminLoginAPI",
  async (credentials, thunkAPI) => {
    try {
      const response = await authAPI.adminLogin(credentials);

      if (response?.data?.token) {
      
        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem("isAdminAuthenticated", "true");
        localStorage.setItem("admin_info", JSON.stringify(response.data));
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
  


