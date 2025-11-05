import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import useSubCategoriesPage from "./useSubCategoriesPage";
const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const SubCategoriesPage = () => {
  const { domain_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const domainName = location.state?.domain_name || "Subcategories";
  const { subcategories, loading, error } = useSubCategoriesPage(domain_id);

  if (!domain_id) {
    return (
      <p className="text-center text-red-600 mt-10 text-lg">
        No course selected. Please go back and select a course.
      </p>
    );
  }

  const beginner = subcategories.filter(
    (sub) => sub.progressive_difficulty === 1
  );
  const intermediate = subcategories.filter(
    (sub) => sub.progressive_difficulty === 2
  );
  const advanced = subcategories.filter(
    (sub) => sub.progressive_difficulty === 3
  );

  const handleSubcategoryClick = (sub) => {
    navigate(`/coaches/${sub.subdomain_id}`, {
      state: { subdomain_name: sub.subdomain_name },
    });
  };

  const renderSubcategories = (subs) =>
    subs.map((sub) => (
      <div
        key={sub.subdomain_id}
        className="group relative border-1 border-gray-300  rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer bg-white"
        onClick={() => handleSubcategoryClick(sub)}
      >
        {/* Image */}
        <div className="h-48 w-full overflow-hidden">
          <img
            src={`${BASE_URL}${sub.subdomain_thumbnail}`}
            alt={sub.subdomain_name}
            className="w-full h-full object-fit transform group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition">
            {sub.subdomain_name}
          </h3>
          <p className="text-sm text-gray-500">
            {sub.progressive_difficulty === 1
              ? "Beginner Level"
              : sub.progressive_difficulty === 2
                ? "Intermediate Level"
                : "Advanced Level"}
          </p>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-20 transition"></div>
      </div>
    ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black flex flex-col pt-4">
      <main className="flex-grow container mx-auto px-6">
        {/* Page Title - Always show */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            {domainName}
          </h1>
        </div>

        {/* Description - Only if there are subcategories */}
        {(beginner.length > 0 || intermediate.length > 0 || advanced.length > 0) && (
          <div className="text-center mb-12">
            <p className="text-gray-600 text-lg">
              Select a subcategory and continue your learning journey
            </p>
          </div>
        )}

        {/* Loading & Error States */}
        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            Loading subcategories...
          </p>
        )}
        {/* Error States */}
        {!loading && error && (
          <>
            {error === "No record found" ? (
              <div className="text-center text-gray-600  mt-4 py-30">
                <p className="mb-2 text-xl">No subcategories available currently.</p>
                <button
                  onClick={() => navigate(-1)}
                  className="text-blue-600 underline hover:text-blue-800 text-xl cursor-pointer"
                >
                  ← Go Back
                </button>
              </div>
            ) : (
              <div className="text-center text-red-600 mb-12">
                <p>{error.message}</p>
              </div>
            )}
          </>
        )}

        {/* Beginner Section */}
        {beginner.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-l-4 border-indigo-500 pl-3">
              Beginner
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderSubcategories(beginner)}
            </div>
          </section>
        )}

        {/* Intermediate Section */}
        {intermediate.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-l-4 border-indigo-500 pl-3">
              Intermediate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderSubcategories(intermediate)}
            </div>
          </section>
        )}

        {/* Advanced Section */}
        {advanced.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 border-l-4 border-indigo-500 pl-3">
              Advanced
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderSubcategories(advanced)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SubCategoriesPage;
