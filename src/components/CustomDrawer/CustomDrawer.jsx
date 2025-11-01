import React from "react";
import { X } from "lucide-react";

const CustomDrawer = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "800px",
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full shadow-2xl transition-transform transform z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        bg-white dark:bg-gray-900 dark:text-gray-100`}
      style={{
        width: "90%", // default mobile width
        maxWidth: width, // up to given width on larger screens
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
        >
          <X size={22} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div
        className="p-4 overflow-y-auto flex-1"
        style={{ height: "calc(100% - 110px)" }}
      >
        {children}
      </div>

      {/* Sticky Footer */}
      {footer && (
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0">
          {footer}
        </div>
      )}
    </div>
  );
};

export default CustomDrawer;
