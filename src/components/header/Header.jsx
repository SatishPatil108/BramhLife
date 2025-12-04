import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHeader } from "./useHeader";
import SearchBarWithDatalist from "@/pages/User/Homepage/components/searchbar/SearchBarWithDatalist";
import UserMenu from "./UserMenu"

function Header() {
  const { links, user } = useHeader();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only apply the scroll effect on the homepage ('/')
    if (location.pathname === '/') {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [location.pathname]);

  return (
    <header
      className={`top-0 left-0 w-full lg:h-20 h-0 z-50 transition-all duration-500 bg-[url(/gradientBackground.png)]`}
    >
      {/* Desktop Header (only for LG and above) */}
      <div className="hidden lg:flex container mx-auto items-center justify-between gap-4 lg:gap-6 py-4 px-4 lg:px-10 flex-wrap">

        {/* Logo */}
        <NavLink to="/" className="whitespace-nowrap shrink-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            BrahmaLYF
          </h1>
        </NavLink>

        {/* Search Bar */}
        <div className="flex-grow min-w-[180px] max-w-md">
          <SearchBarWithDatalist />
        </div>

        {/* Navigation */}
        <nav aria-label="Main navigation" className="shrink-0 max-w-full">
          <ul className="flex flex-wrap items-center justify-end gap-2 lg:gap-4">
            {links.map((link) => (
              <li key={link.to} className="shrink-0">
                <NavLink
                  to={link.to}
                  onClick={() => scrollTo(0, 0)}
                  className={({ isActive }) =>
                    `inline-flex items-center px-3 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all 
              ${isActive
                      ? "bg-purple-600 text-white"
                      : "text-purple-800 hover:bg-purple-400 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {user && <li><UserMenu /></li>}
          </ul>
        </nav>
      </div>


      {/* Mobile + Tablet Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 z-50"
        aria-label="Mobile navigation">
        <ul className="flex justify-around items-center py-3">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center text-xs font-medium transition-colors duration-300 
            ${isActive ? "text-purple-600" : "text-gray-600 hover:text-purple-500"}`
                }
                onClick={() => scrollTo(0, 0)}
              >
                <link.icon className="w-6 h-6 mb-1" />
                <span className="text-[10px]">{link.label}</span>
              </NavLink>
            </li>
          ))}
          {user && <li><UserMenu /></li>}
        </ul>
      </nav>
    </header>
  );
}

export default Header;