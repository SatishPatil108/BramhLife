import React from "react";
import { SquarePen, Trash2 } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CustomTable = ({ columns, data, onEdit, onDelete, onRowClick }) => {
  return (
    <div className="overflow-x-auto w-full rounded-xl shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
      <table className="min-w-full rounded-lg text-sm sm:text-base">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-sm">
            {columns.map((col, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-4 sm:px-6 py-4 border-b border-purple-300/20 dark:border-purple-700/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider text-center"
              >
                {col.header}
              </th>
            ))}

            <th
              className="px-4 sm:px-6 py-4 border-b border-purple-300/20 dark:border-purple-700/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider text-center"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={`cursor-pointer transition-all duration-200
                  ${rowIndex % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                  }
                  hover:bg-purple-100 dark:hover:bg-gray-700
                `}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 text-center whitespace-nowrap"
                  >
                    {col.accessor !== "domain_thumbnail" &&
                      col.accessor !== "subdomain_thumbnail" ? (
                      row[col.accessor]
                    ) : (
                      <div className="flex justify-center items-center">
                        <img
                          src={`${BASE_URL}${row[col.accessor]}`}
                          alt="thumbnail"
                          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover border border-gray-300 dark:border-gray-600 shadow-sm"
                        />
                      </div>
                    )}
                  </td>
                ))}

                {/* Actions */}
                <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-center">
                  <div className="flex flex-row items-center justify-center gap-3">

                    {/* Edit */}
                    <button
                      type="button"
                      aria-label="Edit row"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(row);
                      }}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200
                                 dark:bg-blue-900/40 dark:hover:bg-blue-800/60
                                 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <SquarePen className="text-blue-600 dark:text-blue-300 w-5 h-5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      aria-label="Delete row"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row);
                      }}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 
                                 dark:bg-red-900/40 dark:hover:bg-red-800/60
                                 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <Trash2 className="text-red-600 dark:text-red-300 w-5 h-5" />
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
