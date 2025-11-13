import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import AdminLoginPage from "@/pages/Admin/AdminLogin";
import CoachesList from "@/pages/Admin/CoachList";
import CourseList from "@/pages/Admin/CourseList";
import CourseDetails from "@/pages/Admin/CourseList/CourseDetails";
import AdminDashboard from "@/pages/Admin/Dashboard/AdminDashboard";
import DomainsList from "@/pages/Admin/Domains";
import FrequentlyAskQue from "@/pages/Admin/FrequentlyAskQue";
import MusicList from "@/pages/Admin/SoundList/MusicList";
import SubDomainsList from "@/pages/Admin/SubDomains";
import { isAdminLoggedIn } from "@/store/feature/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const AdminRoutes = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAdminLoggedIn())
  }, [dispatch])

  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="" element={<Navigate to="login" replace />} />
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="domains" element={<DomainsList />} />
        <Route path="domains/:domainId/subdomains" element={<SubDomainsList />} />
        <Route path="coaches" element={<CoachesList />} />
        {/* <Route path="musics" element={<MusicList />} /> */}
        <Route path="courses" element={<CourseList />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="frequently-asked-questions" element={<FrequentlyAskQue />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
