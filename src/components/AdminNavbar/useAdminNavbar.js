import { useSelector } from "react-redux";

// useAdminNavbar.js
const useAdminNavbar = () => {
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    // { name: "Users", path: "/admin/users" },
    { name: "Coaches", path: "/admin/coaches" },
    { name: "Courses", path: "/admin/courses" },
  ];
  const { adminLoginSuccess } = useSelector((state) => state.auth);
  return { navItems,adminLoginSuccess };
};

export default useAdminNavbar;