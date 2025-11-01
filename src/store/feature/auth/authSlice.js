import { createSlice } from "@reduxjs/toolkit";
import { loginUserAPI, registerUserAPI, adminLoginAPI } from "./authThunk";

const initialState = {
  // User state
  user: null,
  userToken: null,
  isUserAuthenticated: false,
  userLoginSuccess: false,
  registerSuccess: false,

  // Admin state
  admin: null,
  adminToken: null,
  isAdminAuthenticated: false,
  adminLoginSuccess: false,

  // Common
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetFlags: (state) => {
      // state.userLoginSuccess = false;
      // state.adminLoginSuccess = false;
      // state.registerSuccess = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userToken = null;
      state.isUserAuthenticated = false;
      state.userLoginSuccess = false;

      localStorage.removeItem("isUserAuthenticated");
      localStorage.removeItem("user_info");
      localStorage.removeItem("user_token");
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.adminToken = null;
      state.isAdminAuthenticated = false;
      state.adminLoginSuccess = false;
      localStorage.removeItem("isAdminAuthenticated");
      localStorage.removeItem("admin_info");
      localStorage.removeItem("admin_token");
    },
    // 03-10-2025
    checkUserLoggedIn: (state) => {
      const isAuth = localStorage.getItem("isUserAuthenticated") === "true";
      const userInfoRaw = localStorage.getItem("user_info");
      const userToken = localStorage.getItem("user_token");

      if (isAuth && userInfoRaw && userToken) {
        try {
          state.user = JSON.parse(userInfoRaw);
        } catch (e) {
          console.error("Invalid JSON in localStorage user_info", e);
          state.user = null;
        }

        state.isUserAuthenticated = true;
        state.userToken = userToken;
        state.userLoginSuccess = true; // Consider setting this to true if login success matters
      } else {
        state.user = null;
        state.userToken = null;
        state.isUserAuthenticated = false;
        state.userLoginSuccess = false;
      }
    },
    isAdminLoggedIn: (state) => {
      const isAdmin = localStorage.getItem('isAdminAuthenticated') === 'true';
      const adminInfoRow = localStorage.getItem('admin_info') || null;
      const admin_token = localStorage.getItem('admin_token') || null;

      if (isAdmin && adminInfoRow && admin_token) {
        state.admin = JSON.parse(adminInfoRow);
        state.adminToken = admin_token;
        state.isAdminAuthenticated = true;
        state.adminLoginSuccess = true;
      }
      else {
        state.admin = null;
        state.adminToken = null;
        state.isAdminAuthenticated = false;
        state.adminLoginSuccess = false;
      }
    }

  },
  extraReducers: (builder) => {
    builder
      // ----------------- User Login -----------------
      .addCase(loginUserAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userLoginSuccess = false;
      })
      .addCase(loginUserAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;

        if (res?.data?.token) {
          state.isUserAuthenticated = true;
          state.userLoginSuccess = true;
          state.user = res.data;
          state.userToken = res.data.token;
          state.error = null;
        } else {
          state.isUserAuthenticated = false;
          state.userLoginSuccess = false;
          state.error = res?.message || "User login failed";
        }
      })
      .addCase(loginUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isUserAuthenticated = false;
        state.userLoginSuccess = false;

        state.error = action.payload === "Network Error" ? "Please check internet connection" : action.payload || action.error.message;
      })

      // ----------------- User Register -----------------
      .addCase(registerUserAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUserAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;

        if (res?.response_code === 1 || res?.data?.id) {
          state.registerSuccess = true;
          state.user = res.data || null;
          state.error = null;
        } else {
          state.registerSuccess = false;
          state.error = res?.message || "Registration failed";
        }
      })
      .addCase(registerUserAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.registerSuccess = false;
        state.error = action.payload === "Network Error" ? "Please check internet connection" : action.payload || action.error.message;
      })

      // ----------------- Admin Login -----------------
      .addCase(adminLoginAPI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.adminLoginSuccess = false;
      })
      .addCase(adminLoginAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        const res = action.payload;

        if (res?.data?.token) {
          state.isAdminAuthenticated = true;
          state.adminLoginSuccess = true;
          state.admin = res.data;
          state.adminToken = res.data.token;
          state.error = null;
        } else {
          state.isAdminAuthenticated = false;
          state.adminLoginSuccess = false;
          state.error = res?.message || "Admin login failed";
        }
      })
      .addCase(adminLoginAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isAdminAuthenticated = false;
        state.adminLoginSuccess = false;
        state.error = action.payload === "Network Error" ? "Please check internet connection" : action.payload || action.error.message;

      });

  },
});

export const {
  clearError,
  resetFlags,
  logoutUser,
  logoutAdmin,
  checkUserLoggedIn,
  isAdminLoggedIn
} = authSlice.actions;

export default authSlice.reducer;











// import { createSlice } from "@reduxjs/toolkit";
// import { loginUserAPI, registerUserAPI, adminLoginAPI } from "./authThunk";

// const initialState = {
//   // User state
//   user: null,
//   userToken: null,
//   isUserAuthenticated: false,
//   userLoginSuccess: false,
//   registerSuccess: false,

//   // Admin state
//   admin: null,
//   adminToken: null,
//   isAdminAuthenticated: false,
//   adminLoginSuccess: false,

//   // Common
//   isLoading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     resetFlags: (state) => {
//       // state.userLoginSuccess = false;
//       // state.adminLoginSuccess = false;
//       // state.registerSuccess = false;
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.userToken = null;
//       state.isUserAuthenticated = false;
//       state.userLoginSuccess = false;

//       localStorage.removeItem("user_token");
//       localStorage.removeItem("isUserAuthenticated");
//       localStorage.removeItem("user_info");
//     },
//     logoutAdmin: (state) => {
//       state.admin = null;
//       state.adminToken = null;
//       state.isAdminAuthenticated = false;
//       state.adminLoginSuccess = false;
//     },

//     isAdminLoggedIn: (state) => {
//       const isAdmin = localStorage.getItem('isAdminAuthenticated') === 'true';
//       const adminInfoRow = localStorage.getItem('admin_info') || null;
//       const admin_token = localStorage.getItem('admin_token') || null;

//       if (isAdmin && adminInfoRow && admin_token) {
//         state.admin = JSON.parse(adminInfoRow);
//         state.adminToken = admin_token;
//         state.isAdminAuthenticated = true;
//         state.adminLoginSuccess = true;
//       }
//       else {
//         state.admin = null;
//         state.adminToken = null;
//         state.isAdminAuthenticated = false;
//         state.adminLoginSuccess = false;
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // ----------------- User Login -----------------
//       .addCase(loginUserAPI.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.userLoginSuccess = false;
//       })
//       .addCase(loginUserAPI.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const res = action.payload;

//         if (res?.data?.token) {
//           state.isUserAuthenticated = true;
//           state.userLoginSuccess = true;
//           state.user = res.data;
//           state.userToken = res.data.token;
//           state.error = null;
//         } else {
//           state.isUserAuthenticated = false;
//           state.userLoginSuccess = false;
//           state.error = res?.message || "User login failed";
//         }
//       })
//       .addCase(loginUserAPI.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isUserAuthenticated = false;
//         state.userLoginSuccess = false;
//         state.error = action.payload || action.error.message;
//       })

//       // ----------------- User Register -----------------
//       .addCase(registerUserAPI.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.registerSuccess = false;
//       })
//       .addCase(registerUserAPI.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const res = action.payload;

//         if (res?.response_code === 1 || res?.data?.id) {
//           state.registerSuccess = true;
//           state.user = res.data || null;
//           state.error = null;
//         } else {
//           state.registerSuccess = false;
//           state.error = res?.message || "Registration failed";
//         }
//       })
//       .addCase(registerUserAPI.rejected, (state, action) => {
//         state.isLoading = false;
//         state.registerSuccess = false;
//         state.error = action.payload || action.error.message;
//       })

//       // ----------------- Admin Login -----------------
//       .addCase(adminLoginAPI.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//         state.adminLoginSuccess = false;
//       })
//       .addCase(adminLoginAPI.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const res = action.payload;

//         if (res?.data?.token) {
//           state.isAdminAuthenticated = true;
//           state.adminLoginSuccess = true;
//           state.admin = res.data;
//           state.adminToken = res.data.token;
//           state.error = null;
//         } else {
//           state.isAdminAuthenticated = false;
//           state.adminLoginSuccess = false;
//           state.error = res?.message || "Admin login failed";
//         }
//       })
//       .addCase(adminLoginAPI.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isAdminAuthenticated = false;
//         state.adminLoginSuccess = false;
//         state.error = action.payload || action.error.message;
//       });

//   },
// });

// export const {
//   clearError,
//   resetFlags,
//   logoutUser,
//   logoutAdmin,
//   isAdminLoggedIn
// } = authSlice.actions;

// export default authSlice.reducer;





