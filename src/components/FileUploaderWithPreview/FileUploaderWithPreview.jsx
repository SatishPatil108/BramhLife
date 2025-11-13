import { useEffect, useState } from "react";

const FileUploaderWithPreview = ({ imageFile = null, setImageFile, imageUrl = null ,name=''}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;
  const [previewSrc, setPreviewSrc] = useState(null);

  // ✅ Update preview when imageFile or imageUrl changes
  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreviewSrc(objectUrl);

      // Cleanup old blob URL to avoid memory leaks
      return () => URL.revokeObjectURL(objectUrl);
    } else if (imageUrl) {
      setPreviewSrc(`${BASE_URL}${imageUrl}`);
    } else {
      setPreviewSrc(null);
    }
  }, [imageFile, imageUrl, BASE_URL]);

  return (
    <div>
      <label
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer
        hover:border-purple-500 dark:border-gray-600 dark:hover:border-purple-400
        bg-gray-50 dark:bg-gray-800 transition-all duration-300"
      >
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          Click to choose an image
        </span>
        <input
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </label>

      {/* ✅ Updated Preview Section */}
      {previewSrc && (
        <div className="mt-3">

            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
              Selected File: {imageFile?.name || imageUrl?.split('/').pop() || "no file selected"}
            </p>

          <div className="flex justify-center sm:justify-start">
            <a href={previewSrc} target="_blank" rel="noopener noreferrer">
              <img
                src={previewSrc}
                alt="Preview"
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover mt-2 border rounded-md dark:border-gray-600 shadow-md"
              />
            </a>
          </div>
        </div>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400">
              Supported formats: JPG, PNG, GIF
            </p>
    </div>
  );
};

export default FileUploaderWithPreview;