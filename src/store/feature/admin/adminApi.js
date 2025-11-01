import { API_METHODS, makeRequest } from "@/api";

// Fetch Admin Dashboard Data
export const fetchAdminDashboardData = async () => {
  return await makeRequest({
    service: "admin/dashboard/dashboard-data",
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
};

//get all Domains List
export const fetchAllDomains = async (pageNo = 1, pageSize = 10) => {
  return await makeRequest({
    service: `admin/all-domains/${pageNo}/${pageSize}`,
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
};

//add a new domain
export const addDomain = async (domainData) => {
  return await makeRequest({
    service: "admin/domain",
    method: API_METHODS.POST,
    data: domainData,
    authRequired: true,
    tokenType: "admin",
  });
};
//update a domain
export const updateDomain = async (domainId, domainData) => {
  return await makeRequest({
    service: `admin/domain/update/${domainId}`,
    method: API_METHODS.PUT,
    data: domainData,
    authRequired: true,
    tokenType: "admin",
  });
};

//delete a domain
export const deleteDomain = async (domainId) => {
  return await makeRequest({
    service: `admin/domain/delete/${domainId}`,
    method: API_METHODS.DELETE,
    authRequired: true,
    tokenType: "admin",
  });
};

// fetch all subdomains with pagination
export const fetchSubDomains = async (pageNo = 1, pageSize = 10, domainId) => {
  return await makeRequest({
    service: `admin/subdomains/${pageNo}/${pageSize}/${domainId}`,
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
};

//add a new subdomain
export const addSubDomain = async (subdomainData) => {
  return await makeRequest({
    service: "admin/subdomain",
    method: API_METHODS.POST,
    data: subdomainData,
    authRequired: true,
    tokenType: "admin",
  });
};

//update a subdomain
export const updateSubDomain = async (subdomainId, subdomainData) => {
  return await makeRequest({
    service: `admin/subdomain/update/${subdomainId}`,
    method: API_METHODS.PUT,
    data: subdomainData,
    authRequired: true,
    tokenType: "admin",
  });
}

// //delete a subdomain
// export const deleteSubDomain=async(subdomainId)=>{
//   return await makeRequest({
//     service:`admin/subdomain/delete/${subdomainId}`,
//     authRequired:true,
//     tokenType:"admin",
//   });
// }
// delete a subdomain with subdomain_id in the payload
export const deleteSubDomain = async (subdomainId) => {
  return await makeRequest({
    service: `admin/subdomain/delete/${subdomainId}`,
    method: API_METHODS.DELETE,
    data: { subdomain_id: subdomainId },
    authRequired: true,
    tokenType: "admin",
  });
};


// Fetch all coaches with pagination
export const fetchAllCoaches = async (pageNo = 1, pageSize = 10) => {
  return await makeRequest({
    service: `admin/all-coaches/${pageNo}/${pageSize}`,
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
};

// Add New Coach
export const addNewCoach = async (coachData) => {
  return await makeRequest({
    service: "admin/coaches",
    method: API_METHODS.POST,
    data: coachData,
    authRequired: true,
    tokenType: "admin",
  });
}
//update a coach
export const updateCoach = async (coachId, coachData) => {
  return await makeRequest({
    service: `admin/coaches/update/${coachId}`,
    method: API_METHODS.PUT,
    data: coachData,
    authRequired: true,
    tokenType: "admin",
  });
}
//delete a coach
export const deleteCoach = async (coachId) => {
  return await makeRequest({
    service: `admin/coaches/${coachId}`,
    method: API_METHODS.DELETE,
    authRequired: true,
    tokenType: "admin",
  });
}

//coach details
export const fetchCoachDetails = async (coachId) => {
  return await makeRequest({
    service: `admin/coaches/${coachId}`,
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
}

// Fetch all courses with pagination
export const fetchAllCourses = async (pageNo = 1, pageSize = 50) => {
  return await makeRequest({
    service: `admin/coaches/course/${pageNo}/${pageSize}`,
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
};

// course details
export const fetchCourseDetails = async (courseId) => {
  return await makeRequest({
    service: `admin/coaches/course/${courseId}`,
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
};

//add a new course
export const addNewCourse = async (courseData) => {

  return await makeRequest({
    service: "admin/coaches/course",
    method: API_METHODS.POST,
    data: courseData,
    authRequired: true,
    tokenType: "admin",
  });
}
//get all coaches
export const fetchCoaches = async () => {
  return await makeRequest({
    service: "admin/coach/all-coaches",
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
}

//post curriculam data
// Add curriculum outline for a course (POST)
export const addCourseCurriculum = async (curriculumData) => {
  return await makeRequest({
    service: `admin/coaches/curriculum_outline`,
    method: API_METHODS.POST,
    data: curriculumData,
    authRequired: true,
    tokenType: "admin",
  });
};

//post intro video to coach
export const addIntroVideo = async (videoData) => {
  return await makeRequest({
    service: `admin/coaches/video`,
    method: API_METHODS.POST,
    data: videoData,
    authRequired: true,
    tokenType: "admin",
  });
};

//post course videos
export const addCourseVideos = async (videoData) => {
  return await makeRequest({
    service: `admin/coaches/videos/course-video`,
    method: API_METHODS.POST,
    data: videoData,
    authRequired: true,
    tokenType: "admin",
  });
};

//delete course
export const deleteCourse = async (courseId) => {
  return await makeRequest({
    service: `admin/coaches/course/${courseId}`,
    method: API_METHODS.DELETE,
    authRequired: true,
    tokenType: "admin",
  });
}

//update course
export const updateCourse = async (courseId, courseData) => {
  return await makeRequest({
    service: `admin/coaches/course/update/${courseId}`,
    method: API_METHODS.PUT,
    data: courseData,
    authRequired: true,
    tokenType: "admin",
  });
}


// fetch Frequently Asked Questions list
export const fetchFAQs = async (pageNo, pageSize) => {
  return await makeRequest({
    service: `admin/faq/${pageNo}/${pageSize}`,
    method: API_METHODS.GET,
    authRequired: true,
    tokenType: "admin",
  });
};

//add a new FAQ
export const addNewFAQ = async (faqData) => {
  return await makeRequest({
    service: "admin/faq",
    method: API_METHODS.POST,
    data: faqData,
    authRequired: true,
    tokenType: "admin",
  });
}

//update faq
export const updateFAQ = async (faqId, faqData) => {
  return await makeRequest({
    service: `admin/faq/${faqId}`,
    method: API_METHODS.PUT,
    data: faqData,
    authRequired: true,
    tokenType: "admin",
  });
}

//delete faq
export const deleteFAQ = async (faqId) => {
  return await makeRequest({
    service: `admin/faq/${faqId}`,
    method: API_METHODS.DELETE,
    authRequired: true,
    tokenType: "admin",
  });
}

