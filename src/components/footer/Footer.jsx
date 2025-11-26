import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Courses", "About", "FAQs"]
    },
    {
      title: "Need Help?",
      links: ["Payment Methods", "Contact Us"]
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"]
    }
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 top-0 left-0 w-full z-50 transition-all duration-500 bg-[url(/gradientBackground.png)]">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-4 border-b border-gray-500/30 text-gray-500">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            BrahmaLYF
          </h2>
          <p className="max-w-[410px] mt-3">
            Empowering people to grow, heal, and transform through world-class coaching and mindful programs.</p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-2">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text md:mb-5">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-pink-400">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-sm text-gray-400  border-t border-gray-300 pb-4">
        Copyright © {new Date().getFullYear()} BrahmaLYF. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
