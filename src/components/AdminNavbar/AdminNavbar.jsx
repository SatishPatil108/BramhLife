import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import CustomButton from "@/components/CustomButton";
import useAdminNavbar from "./useAdminNavbar";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "@/store/feature/auth/authSlice";

const AdminNavbar = () => {
  const { navItems, adminLoginSuccess } = useAdminNavbar();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/admin") {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [location.pathname]);

  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 ${isActive
      ? "bg-purple-600 text-white shadow-lg "
      : "text-gray-900 hover:text-white hover:bg-purple-400  lg:text-black sm:text-white"
    }`;

  const handleLogout = () => {
    if (confirm("are you sure to logout")) {
      dispatch(logoutAdmin());
      navigate("/admin/login");
    }
  };

  return (
    <header
      className={`top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? "bg-green-50 backdrop-blur-md shadow-xl"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/admin/dashboard"
            className="text-3xl font-extrabold tracking-wide"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              BrahmaLYF
            </span>
          </Link>

          {/* Desktop Nav */}
          {adminLoginSuccess && (
            <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <NavLink key={item.path} to={item.path} className={linkStyle}>
                  {item.name}
                </NavLink>
              ))}
            </nav>
          )}

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {adminLoginSuccess ? (
              <CustomButton variant="danger" onClick={handleLogout}>
                Logout
              </CustomButton>
            ) : (
              <CustomButton variant="primary" onClick={() => navigate("/admin/login")}>
                Login
              </CustomButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 p-1 text-red-500 rounded-full bg-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}

          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700">
          <div className="flex flex-col items-center space-y-3 py-4">
            {adminLoginSuccess &&
              navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={linkStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            {adminLoginSuccess ? (
              <CustomButton variant="danger" onClick={handleLogout}>
                Logout
              </CustomButton>
            ) : (
              <CustomButton variant="primary" onClick={() => navigate("/admin/login")}>
                Login
              </CustomButton>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;