// authApi.js
import { makeRequest, API_METHODS } from "../../../api/axiosClient";

export const loginUser = async (credentials) => {
  return await makeRequest({
    service: "user/login",
    method: API_METHODS.POST,
    data: credentials,
    authRequired: false, 
  });
};

export const registerUser = async (credentials) => {
  return await makeRequest({
    service: "user/registration",
    method: API_METHODS.POST,
    data: credentials,
    authRequired: false,
  });
};

export const logoutUser = async () => {
  return await makeRequest({
    service: "authorization/logout",
    method: API_METHODS.POST,
  });
};

//admin login api
export const adminLogin = async (credentials) => {
  return await makeRequest({
    service: "admin/auth/login",
    method: API_METHODS.POST,
    data: credentials,
    authRequired: false,
  });
};  
