import React from "react";

const CustomButton = ({ children, onClick, variant = "primary" }) => {
  let baseStyle =
    "px-4 py-1.5 rounded-full font-medium transition duration-300 focus:outline-none hover:bg-purple-300";

  let variantStyle = "";

  switch (variant) {
    case "primary":
      variantStyle = "bg-blue-600 hover:bg-blue-700 text-white";
      break;
    case "gradient":
      variantStyle =
        "bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white";
      break;
    case "gray":
      variantStyle = "bg-gray-600 hover:bg-gray-700 text-white";
      break;
    case "black":
      variantStyle = "bg-black hover:bg-gray-800 text-white";
      break;
    case "danger":
      variantStyle = "bg-red-600 hover:bg-red-400 text-white cursor-pointer font-semibold";
      break;
    default:
      variantStyle = "bg-blue-600 hover:bg-blue-700 text-white";
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
      {children}
    </button>
  );
};

export default CustomButton;
