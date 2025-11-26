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
import BannerImage from "@/pages/User/Homepage/components/bannerImages.jsx/BannerImage";
import Categories from "@/pages/User/Homepage/components/getAllCategories/Categories";
import SubCategories from "@/pages/User/Homepage/components/getAllSubCategories/SubCategories";
import FAQPage from "@/pages/User/Homepage/components/FAQsSections/FAQPage";
import MusicPlayer from "@/pages/User/Music/MusicPlayer";

const UserRoutes = () => {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(checkUserLoggedIn());
  }, [dispath]);

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
          <Route path="/categories" element={<CourseList />} />
          <Route path="/subcategories/:domain_id" element={<SubCategoriesPage />} />
          <Route path="/musics" element={<MusicList />} />
          <Route path="/music/:musicId" element={<MusicPlayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<UserLoggedOut />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coaches/:subdomainId" element={<CoachesInfoPage />} />
          <Route path="/coach-details/:videoId" element={<CoachDetailsPage />} />
          <Route path="/coach/:coachId" element={<CoachProfile />} />
          <Route path="/coaches" element={<GetAllCoaches />} />
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
