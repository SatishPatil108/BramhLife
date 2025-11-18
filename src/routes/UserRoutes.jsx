import React, { useEffect } from "react";
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
import Footer from "@/components/footer/Footer";
import UserLoggedOut from "@/pages/User/userLoggedOut";
import { useDispatch } from "react-redux";
import { checkUserLoggedIn } from "@/store/feature/auth/authSlice";
import MusicList from "@/pages/User/Homepage/components/getAllMusicList/MusicList";

const UserRoutes = () => {
  const dispath = useDispatch();

  useEffect(()=>{
    dispath(checkUserLoggedIn());
  },[dispath]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content fills remaining space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/musics" element={<MusicList />} />
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
        </Routes>
      </main>

      {/* Footer — hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default UserRoutes;
