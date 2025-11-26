import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // Calculate page range
    let start = 1;
    let end = totalPages;

    if (totalPages > 5) {
        if (currentPage <= 3) {
            start = 1;
            end = 5;
        } else if (currentPage >= totalPages - 2) {
            start = totalPages - 4;
            end = totalPages;
        } else {
            start = currentPage - 2;
            end = currentPage + 2;
        }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`px-4 py-2 rounded-full text-sm border font-medium ${i === currentPage
                    ? "bg-purple-600 text-white border-purple-600"
                    : "text-purple-600 border-purple-400 hover:bg-purple-100"
                    }`}
            >
                {/* <ChevronLeftIcon className="mx-2 w-10 h-10" /> */}
                {i}
            </button>
        );
    }

    return (
        <div className="flex justify-center items-center mt-12 gap-2">

            {/* Prev - Only if totalPages >= 5 */}
            {totalPages >= 5 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full  text-sm font-medium"
                >
                    <ChevronLeftIcon className={`mx-2 w-8 h-8 ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-purple-600 hover:bg-purple-100 cursor-pointer"
                        }`} />

                </button>
            )}

            {pages}

            {/* Next - Only if totalPages >= 5 */}
            {totalPages >= 5 && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-full  text-sm font-medium  `}
                >
                    <ChevronRightIcon className={`mx-2 w-8 h-8 ${currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-purple-600 hover:bg-purple-100 cursor-pointer"
                        }`} />

                </button>
            )}
        </div>
    );
};

export default Pagination;