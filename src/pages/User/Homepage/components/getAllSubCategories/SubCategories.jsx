import useSubCategoriesPage from '@/pages/User/subCategories/useSubCategoriesPage';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const SubCategories = ({ category }) => {
  const { subcategories, loading, error } = useSubCategoriesPage(category.domain_id);
  const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/subcategories/${category.domain_id}`);
    console.log("Clicked:", subcategory.subdomain_name);
  };

  return (
    <div className="mt-8">
      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          Loading subcategories...
        </p>
      )}

      {/* Category Name */}
      <h4 className="m-2 text-2xl md:text-3xl font-extrabold">
        {category.domain_name}
      </h4>

      {/* No Subcategories */}
      {!subcategories?.length && !loading && (
        <div>
          <p className="mb-2 text-lg px-6 text-gray-400 italic">
            No subcategories available currently.
          </p>
        </div>
      )}

      {/* Subcategory Cards */}
      {subcategories && subcategories.length > 0 && (
        <div className="px-4 mt-4">
          <div
            className="flex overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory gap-6 pb-4"
          >
            {subcategories.map((subcategory) => (
                <motion.div
                  key={subcategory.subdomain_id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => handleSubcategoryClick(subcategory)}
                  className="w-[250px] sm:w-[300px] md:w-[320px] 
                flex-shrink-0 cursor-pointer bg-white snap-start group relative shadow-sm border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="overflow-hidden flex justify-center items-center h-[160px] bg-gray-50">
                    <img
                      src={`${BASE_URL}${subcategory.subdomain_thumbnail}`}
                      alt={subcategory.subdomain_name}
                      className="w-[100%] h-[100%] object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition">
                      {subcategory.subdomain_name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {subcategory.progressive_difficulty === 1
                        ? 'Beginner Level'
                        : subcategory.progressive_difficulty === 2
                          ? 'Intermediate Level'
                          : 'Advanced Level'}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-10 transition duration-300"></div>
                </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategories;
