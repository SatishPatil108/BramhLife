import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHeader } from "./useHeader";
import SearchBarWithDatalist from "@/pages/User/Homepage/components/searchbar/SearchBarWithDatalist";

function Header() {
  const { links } = useHeader();
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
      className={`top-0 left-0 w-full mb-2 z-50 transition-all duration-500 bg-[url(/gradientBackground.png)]`}
    >
      {/* Desktop Header */}
      <div className="hidden md:flex container mx-auto items-center gap-4 lg:gap-6 py-3 px-4 lg:px-10">

        {/* Logo */}
        <NavLink to="/" className="whitespace-nowrap">
          <h1
            className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide 
                 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 
                 text-transparent bg-clip-text"
          >
            BrahmaLYF
          </h1>
        </NavLink>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm md:max-w-md lg:max-w-lg">
          <SearchBarWithDatalist />
        </div>

        {/* Navigation */}
        <nav aria-label="Main navigation" className="shrink-0">
          <ul className="flex items-center gap-2 md:gap-2 lg:gap-5">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => scrollTo(0, 0)}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 md:gap-2
              px-2 md:px-3 lg:px-5 
              py-1.5 md:py-2 
              rounded-full font-semibold transition-all duration-300
              text-[10px] md:text-xs lg:text-base
              ${isActive
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-purple-800 hover:text-white hover:bg-purple-400"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>


      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 z-50"
        aria-label="Mobile navigation"
      >
        <ul className="flex justify-around items-center py-3">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center text-xs font-medium transition-colors duration-300 
                  ${isActive
                    ? "text-purple-600"
                    : "text-gray-600 hover:text-purple-500"}`
                }
                onClick={() => scrollTo(0, 0)}
              >
                <link.icon className="w-6 h-6 mb-1" />
                {/* Optional small label under icon */}
                <span className="text-[10px]">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
