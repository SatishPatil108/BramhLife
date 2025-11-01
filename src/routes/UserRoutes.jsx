import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SubCategoriesPage from "@/pages/User/subCategories";
import CoachesInfoPage from "@/pages/User/coachesInfo";
import CoachDetailsPage from "@/pages/User/coachDetails";
import CoachProfile from "@/pages/User/coachProfile";
import GetAllCoaches from "@/pages/User/getAllCoaches";
import Header from "@/components/header/Header";
import { Login } from "@/pages/User/Login";
import Register from "@/pages/User/Register";
import { About, Contact, Homepage } from "@/pages/User/Homepage";
import { CourseList } from "@/pages/User/courses";
import EnrolledCourses from "@/pages/User/myCourses";
import EnrolledCourseDetails from "@/pages/User/enrolledCourseDetails";
import { CourseByNameOrCoachName } from "@/pages/User/courseByNameOrCoachName";
import Footer from "@/components/footer/Footer";
import UserLoggedOut from "@/pages/User/userLoggedOut";



const UserRoutes = () => {
  // 🔹 Hardcoded token for testing
  const hardcodedToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE3NTUwNjc5MjZ9.MpBqOoRpsi7IFSroaBn_VFu_AEAbp6I64jNd6RNec9Y";

  // ✅ conditionally check token (later replace with localStorage.getItem("token"))
  const isLoggedIn = Boolean(hardcodedToken);

  return (
    <>
      {isLoggedIn && <Header />}

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Homepage />} />
    
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<UserLoggedOut />} />

        <Route path="/subcategories/:domain_id" element={<SubCategoriesPage />} />
        <Route path="/coaches/:subdomainId" element={<CoachesInfoPage />} />
        <Route path="/coach-details/:videoId" element={<CoachDetailsPage />} />
        <Route path="/coach-profile/:coachId" element={<CoachProfile />} />
        <Route path="/coach-profile" element={<GetAllCoaches />} />
        <Route path="/my-courses" element={<EnrolledCourses />} />
        <Route path="/enrolled-course/:courseId" element={<EnrolledCourseDetails />} />
        <Route path="/courses/course/search" element={<CourseByNameOrCoachName />} />

      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
