import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHeader } from "./useHeader";

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
      className={`top-0 left-0 w-full z-50 transition-all duration-500 bg-[url(/gradientBackground.png)]`}
    >
      {/* Desktop Header */}
      <div className="hidden md:flex container mx-auto items-center justify-between py-3 px-10">
        <NavLink to="/">
          <h1
            className={`text-3xl font-bold tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 
             text-transparent bg-clip-text`}
          >
            BrahmaLYF
          </h1>
        </NavLink>

        <nav aria-label="Main navigation">
          <ul className="flex flex-row items-center gap-6">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
                     ${isActive
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-purple-800 hover:text-white hover:bg-purple-400"}`
                  }
                  aria-current={location.pathname === link.to ? "page" : undefined}
                  onClick={() => scrollTo(0, 0)}
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
