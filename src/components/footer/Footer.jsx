import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-gray-400 bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat max-w-full">
      <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-left">
        {/* Logo & About */}
        <div className="flex flex-col justify-between min-h-full">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              BramhLife
            </h2>
            <p className="mt-2 sm:text-base text-gray-400">
              Empowering people to grow, heal, and transform through world-class
              coaching and mindful programs.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col justify-between min-h-full">
          <h3 className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-bold">
            Quick Links
          </h3>
          <ul className="">
            <li><Link to="/" className="hover:text-pink-400">Home</Link></li>
            <li><Link to="/courses" className="hover:text-pink-400">Courses</Link></li>
            <li><Link to="/about" className="hover:text-pink-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-pink-400">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col min-h-full">
          <h3 className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-bold">
            Follow Us
          </h3>
          <div className="flex flex-col gap-1 mt-2">
            <a href="#" className="hover:text-pink-400">Facebook</a>
            <a href="#" className="hover:text-pink-400">Instagram</a>
            <a href="#" className="hover:text-pink-400">Twitter</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h3 className="font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-2">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm mb-2 sm:text-base">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="flex flex-col sm:flex-row sm:items-center gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md bg-white text-black text-sm border border-gray-700 focus:outline-none focus:border-pink-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md text-sm font-semibold hover:scale-105 transition hover:from-pink-400 hover:to-purple-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center text-sm text-gray-400  border-t border-gray-300 ">
        Copyright © {new Date().getFullYear()} BramhLife. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
