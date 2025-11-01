import React from "react";
import { SquarePen, Trash2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CustomTable = ({ columns, data, onEdit, onDelete, onRowClick }) => {
  return (
    <div className="overflow-x-auto w-full bg-white dark:bg-gray-900 rounded-lg shadow-md  transition-colors duration-300">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg text-sm sm:text-base">
        <thead>
          <tr className="bg-[#F6AB41] dark:bg-gray-800 hover:bg-[#f1b45f] dark:hover:bg-gray-700 transition-colors duration-200">
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-4 sm:px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 font-semibold text-xs sm:text-sm uppercase tracking-wider text-center"
              >
                {col.header}
              </th>
            ))}
            <th className="px-4 sm:px-6 py-3 border-b border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-300 font-semibold text-xs sm:text-sm uppercase tracking-wider text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`cursor-pointer transition-colors duration-200 ease-in-out ${
                  rowIndex % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-[#ffe5b6] dark:hover:bg-gray-700`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-center whitespace-nowrap"
                  >
                    {col.accessor !== "domain_thumbnail" &&
                    col.accessor !== "subdomain_thumbnail" ? (
                      row[col.accessor]
                    ) : (
                      <div className="flex justify-center items-center">
                        <img
                          src={`${BASE_URL}${row[col.accessor]}`}
                          alt="thumbnail"
                          className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                        />
                      </div>
                    )}
                  </td>
                ))}

                {/* Actions Column */}
                <td className="px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700 text-center">
                  <div className="flex flex-col lg:flex-row lg:gap-3 justify-center gap-2">
                    {/* Edit Button */}
                    <button
                      type="button"
                      tabIndex={0}
                      aria-label="Edit row"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(row);
                      }}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200
                                 dark:bg-blue-800 dark:hover:bg-blue-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SquarePen className="text-blue-600 dark:text-blue-300 w-5 h-5 sm:w-6 sm:h-6 m-auto" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      tabIndex={0}
                      aria-label="Delete row"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row);
                      }}
                      className="p-2 sm:p-2.5 rounded-full bg-red-100 hover:bg-red-200
                                 dark:bg-red-800 dark:hover:bg-red-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2 className="text-red-600 dark:text-red-300 w-5 h-5 sm:w-6 sm:h-6 m-auto" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center px-6 py-10 border-b border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;