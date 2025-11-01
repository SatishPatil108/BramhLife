import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({ baseURL, timeout: 10000 });

const getHeaders = (authRequired, headers = {}, tokenType = "user", data) => {
  let token = null;
  if (authRequired) {
    token = tokenType === "admin" ? localStorage.getItem("admin_token") : localStorage.getItem("user_token");
  }

  const defaultHeaders = { ...headers };

  // Only set JSON if data is NOT FormData
  if (!(data instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    defaultHeaders["Authorization"] = token;
  }

  return defaultHeaders;
};

export const makeRequest = async ({
  service,
  method = "GET",
  data = {},
  params = {},
  headers = {},
  authRequired = true,
  tokenType = "user",
  pageNo,
  pageSize,
}) => {
  const finalHeaders = getHeaders(authRequired, headers, tokenType, data);

  let finalUrl = service;
  if (pageNo != null && pageSize != null) {
    finalUrl = `${service}/${pageNo}/${pageSize}`;
  }

  try {
    const response = await axiosClient({
      url: finalUrl,
      method,
      data,
      params,
      headers: finalHeaders,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
