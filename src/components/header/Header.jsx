import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useHeader } from "./useHeader";
import { MenuIcon, XIcon } from 'lucide-react';

function Header() {
  const { links } = useHeader();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Only apply the scroll effect on the homepage ('/')
    if (location.pathname === '/') {
      const handleScroll = () => {
        // console.log(window.scrollY)
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      // For other pages, the header should always be opaque
      setIsScrolled(true);
    }
  }, [location.pathname]);

  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
      ? "bg-purple-600 text-white shadow-lg"
      : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <header
      className={`top-0 left-0 w-full z-50 transition-all duration-500 bg-[url(/gradientBackground.png)]`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-10">
        <NavLink to="/">
          <h1
            className={`text-3xl font-bold tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 
             text-transparent bg-clip-text`}
          >
            BramhLife
          </h1>
        </NavLink>
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col
                      md:flex-row items-center max-md:pt-20 max-md:pb-10 gap-8 min-md:px-8 py-2  min-md:rounded-full
                        overflow-hidden transition-[width] 
                      duration-300 ${isOpen ? 'max-md:w-full bg-gradient-to-b from-[#75e7e0] to-[#46e1f6]' : 'max-md:w-0 '}`}>
          <XIcon className=' md:hidden absolute top-6 right-6 w-8 h-8 cursor-pointer rounded-full bg-white text-red-600 p-1' onClick={() => setIsOpen(!isOpen)} />

          <nav aria-label="Main navigation">
            <ul className="flex flex-col md:flex-row items-center gap-6">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `inline-block px-5 py-2 rounded-full  font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
             ${isActive
                        ? "bg-purple-600 text-white shadow-md"
                        : "text-purple-800 hover:text-white hover:bg-purple-400"}`
                    }
                    aria-current={location.pathname === link.to ? "page" : undefined}
                    onClick={() => {
                      scrollTo(0, 0);
                      setIsOpen(false);
                    }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <MenuIcon className='max-md:ml-4 md:hidden w-10  h-10 font-bold cursor-pointer text-black' onClick={() => setIsOpen(!isOpen)} />
      </div>
    </header>
  );
}

export default Header;