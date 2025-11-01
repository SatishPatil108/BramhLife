import { createSlice } from "@reduxjs/toolkit";
import {
  addNewDomain,
  getAdminDashboardData,
  getAllDomains,
  updateDomainAPI,
  deleteDomainAPI,
  fetchAllSubDomainsAPI,
  addNewSubDomain,
  updateSubDomainAPI,
  deleteSubDomainAPI,
  fetchAllCoachesAPI,
  addNewCoachAPI,
  updateCoachAPI,
  deleteCoachAPI,
  fetchCoachDetailsAPI,
  fetchAllCoursesAPI,
  fetchCourseDetailsAPI,
  addNewCourseAPI,
  fetchCoachesDropdownAPI,
  deleteCourseAPI,
  updateCourseAPI,
  fetchFAQsAPI,
  addNewFAQAPI,
  updateFAQAPI,
  deleteFAQAPI,
} from "./adminThunk";


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboardData: null,
    domains: [],
    subdomains: [],
    coaches: [],
    courses: [],
    coachesList: [],
    faqList: [],

    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    // Admin Dashboard Data
    builder
      .addCase(getAdminDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getAdminDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // All Domains
    builder
      .addCase(getAllDomains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDomains.fulfilled, (state, action) => {
        state.loading = false;
        state.domains = action.payload || [];
      })
      .addCase(getAllDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Add New Domain
      .addCase(addNewDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.domains.push(action.payload);
      })
      .addCase(addNewDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //update Domain
      .addCase(updateDomainAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDomainAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.domains.findIndex(
          (domain) => domain.id === action.payload.id
        );
        if (index !== -1) {
          state.domains[index] = action.payload;
        }
      })
      .addCase(updateDomainAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Domain
      .addCase(deleteDomainAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDomainAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.domains = state.domains.filter(
          (domain) => domain.id !== action.payload.id
        );
      })
      .addCase(deleteDomainAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch subdomains all subdomains
      .addCase(fetchAllSubDomainsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubDomainsAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.subdomains = action.payload || [];
      })

      .addCase(fetchAllSubDomainsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subdomains";
      })

      //add new subdomain
      .addCase(addNewSubDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewSubDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.subdomains.push(action.payload);
      })
      .addCase(addNewSubDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add new subdomain";
      })
      //update subdomain
      .addCase(updateSubDomainAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateSubDomainAPI.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (!updated) return;
        const index = state.subdomains.findIndex(
          (s) => s.subdomain_id === updated.subdomain_id
        );
        if (index !== -1) {
          state.subdomains[index] = updated;
        }
      })

      .addCase(updateSubDomainAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update subdomain";
      })

      //delete a subdomain

      .addCase(deleteSubDomainAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubDomainAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.subdomains = state.subdomains.filter(
          (subdomain) => subdomain.subdomain_id !== action.payload.subdomain_id
        );
      })
      .addCase(deleteSubDomainAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all coaches
      .addCase(fetchAllCoachesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoachesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.coaches = action.payload || [];
      })
      .addCase(fetchAllCoachesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add new coach
      .addCase(addNewCoachAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCoachAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.coaches.push(action.payload);
      })
      .addCase(addNewCoachAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update a coach
      .addCase(updateCoachAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoachAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coaches.findIndex(
          (coach) => coach.id === action.payload.id
        );
        if (index !== -1) {
          state.coaches[index] = action.payload;
        }
      })
      .addCase(updateCoachAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete a coach
      .addCase(deleteCoachAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoachAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.coaches = state.coaches.filter(
          (coach) => coach.id !== action.payload.id
        );
      })
      .addCase(deleteCoachAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //coach details
      .addCase(fetchCoachDetailsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoachDetailsAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coaches.findIndex(
          (coach) => coach.id === action.payload.id
        );
        if (index !== -1) {
          state.coaches[index] = action.payload;
        } else {
          state.coaches.push(action.payload);
        }
      })
      .addCase(fetchCoachDetailsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all courses
      .addCase(fetchAllCoursesAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoursesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload || [];
      })
      .addCase(fetchAllCoursesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //course details
      .addCase(fetchCourseDetailsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseDetailsAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (course) => course.id === action.payload.id
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        } else {
          state.courses.push(action.payload);
        }
      })
      .addCase(fetchCourseDetailsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //add new course
      .addCase(addNewCourseAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCourseAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.unshift(action.payload);
        state.courses.pop();
      })
      .addCase(addNewCourseAPI.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload;
      })
      //fetch coaches list in dropdown
      .addCase(fetchCoachesDropdownAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoachesDropdownAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.coachesList = action.payload || [];
      })
      .addCase(fetchCoachesDropdownAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete course
      .addCase(deleteCourseAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (course) => course.id === action.payload.id
        );
        if (index !== -1) {
          state.courses.splice(index, 1);
        }
      })
      .addCase(deleteCourseAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update course
      .addCase(updateCourseAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex(
          (course) =>
            String(course.course_id) === String(action.payload.course_id)
        );
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
      })

      .addCase(updateCourseAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fetch faq list
      .addCase(fetchFAQsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQsAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.faqList = action.payload || [];
      })
      .addCase(fetchFAQsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //add new faq
      .addCase(addNewFAQAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewFAQAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.faqList.push(action.payload);
      })
      .addCase(addNewFAQAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update faq
      .addCase(updateFAQAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFAQAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.faqList.findIndex(
          (faq) => faq.id === action.payload.id
        );
        if (index !== -1) {
          state.faqList[index] = action.payload;
        }
      })
      .addCase(updateFAQAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete faq
      .addCase(deleteFAQAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFAQAPI.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.faqList.findIndex(
          (faq) => faq.id === action.payload.id
        );
        if (index !== -1) {
          state.faqList.splice(index, 1);
        }
      })
      .addCase(deleteFAQAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
