import { Search, Loader2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import useHomepage from "../../useHomepage";
import { searchAPI } from "@/store/feature/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBarWithDatalist = () => {
    const dispatch = useDispatch();
    const { loading, searchDetails, error } = useHomepage();
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const handleSearch = () => {
        if (!searchTerm.trim()) return;
        dispatch(searchAPI(searchTerm));
        setIsDropdownVisible(true);
    };

    const handleSelectItem = (name) => {
        setSearchTerm(name);
        // navigate(`/enrolled-course/${course.course_id}`);
        dispatch(searchAPI(name));
        setIsDropdownVisible(false);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hasResults =
        searchDetails?.courses?.length > 0 || searchDetails?.videos?.length > 0;

    return (
        <div
            ref={dropdownRef}
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-xs mx-auto"
        >
            {/* Search Bar */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 h-10 md:h-8 transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-500">
                <input
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsDropdownVisible(!!e.target.value.trim());
                    }}
                    placeholder="Search course or video"
                    className="flex-1 bg-transparent outline-none text-gray-700 text-sm md:text-base"
                />

                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                ) : (
                    <Search
                        onClick={handleSearch}
                        className="w-5 h-5 text-gray-600 cursor-pointer hover:text-purple-700 active:scale-90"
                    />
                )}
            </div>

            {/* Dropdown */}
            {isDropdownVisible && hasResults && (
                <ul
                    className="absolute w-full z-50 mt-2 bg-white/40 backdrop-blur-lg 
                     rounded-xl shadow-lg border border-white/30
                     max-h-60 overflow-y-auto custom-scrollbar animate-fadeIn
                     text-sm md:text-base"
                >
                    {searchDetails?.courses?.map((course) => (
                        <li
                            key={course.id}
                            className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-black"
                            onClick={() => handleSelectItem(course.course_name)}
                        >
                            <span className="font-semibold text-purple-700">Course:</span>{" "}
                            {course.course_name}
                        </li>
                    ))}

                    {searchDetails?.videos?.map((video) => (
                        <li
                            key={video.id}
                            className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-black"
                            onClick={() => handleSelectItem(video.title)}
                        >
                            <span className="font-semibold text-blue-700">Video:</span>{" "}
                            {video.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBarWithDatalist;