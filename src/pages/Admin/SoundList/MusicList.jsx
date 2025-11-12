import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";


const MusicList = () => {
    const [musicDetails, setMusicDetails] = useState({
        songName: '',
        songInfo: '',
        backGroundImg: null,
        songFile: null
    });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => setMusicDetails({ ...musicDetails, [e.target.name]: e.target.value });

    const handleAddSongs = () => {
        setIsDrawerOpen(true);
        setIsEditing(false);

        setMusicDetails({
            songName: '',
            songInfo: '',
            songThumbnail: null,
            songFile: null
        })
    }

    const handleEditSong = () => {
        setIsEditing(true);
        setFormData({});
        setIsDrawerOpen(true);
    };

    const handleDeleteSong = async () => {
        if (window.confirm("Are you sure you want to delete this Song?")) {
            //   await dispatch(deleteFAQAPI(id)).unwrap();
            //   dispatch(fetchFAQsAPI({ pageNo, pageSize }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-12 gap-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight text-center sm:text-left">
                        Music Lists
                    </h2>
                    <CustomButton
                        onClick={handleAddSongs}
                        className="px-5 py-2 sm:px-6 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 w-full sm:w-auto"
                    >
                        Add New Song
                    </CustomButton>
                </div>

                {/* Music List */}

                <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
                    Loading Songs...
                </p>

                <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
                    No Songs available. Get started by adding a new one!
                </p>


                {/* Drawer */}
                {isDrawerOpen && (
                    <CustomDrawer
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        title={isEditing ? "Edit Song" : "Add New Song"}
                        footer={null}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-base font-medium text-gray-800 dark:text-gray-300">
                                    Song Name
                                </label>
                                <input
                                    type="text"
                                    name="songName"
                                    value={musicDetails.songName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500  transition
                                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Enter the song name"
                                    required
                                    tabIndex={1}
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-800 dark:text-gray-300">
                                    Song Information
                                </label>
                                <textarea
                                    name="songInfo"
                                    rows="4"
                                    value={musicDetails.songInfo}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500  transition
                                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Enter the song information"
                                    required
                                    tabIndex={2}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-100">
                                    Upload Songs Thumbnail
                                </label>
                                <label
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer focus:ring-blue-500 focus:border-blue-500
                                     hover:border-purple-500 dark:border-gray-600 dark:hover:border-purple-400
                                     bg-gray-50 dark:bg-gray-800 transition-all duration-300"
                                >
                                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                                        Click to choose an image
                                    </span>
                                    <input
                                        type="file"
                                        name="songThumbnail"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setMusicDetails(e.target.files[0])}
                                    />
                                </label>

                                {/* Image Preview */}
                                {/* {(domainThumbnail || domainThumbnailUrl) && (
                                    <div className="mt-3">
                                        {domainThumbnail && (
                                            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                                                Selected File: {domainThumbnail.name}
                                            </p>
                                        )}
                                        <div className="flex justify-center sm:justify-start">
                                            <img
                                                src={
                                                    domainThumbnail
                                                        ? URL.createObjectURL(domainThumbnail)
                                                        : `${BASE_URL}${domainThumbnailUrl}`
                                                }
                                                alt="Preview"
                                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover mt-2 border rounded-md dark:border-gray-600 shadow-md"
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </div>

                            <div>
                                <label className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-100">
                                    Upload Audio Song
                                </label>
                                <label
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer focus:ring-blue-500 focus:border-blue-500
                                     hover:border-purple-500 dark:border-gray-600 dark:hover:border-purple-400
                                     bg-gray-50 dark:bg-gray-800 transition-all duration-300"
                                >
                                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                                        Click to choose an audio file
                                    </span>
                                    <input
                                        type="file"
                                        name="songThumbnail"
                                        accept=".mp3"
                                        className="hidden"
                                        onChange={(e) => setMusicDetails(e.target.files[0])}
                                    />
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <CustomButton
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition duration-300 transform hover:scale-105"
                                >
                                    {isEditing ? "Update Song" : "Save Song"}
                                </CustomButton>
                            </div>
                        </form>
                    </CustomDrawer>
                )}
            </div>
        </div>
    )
}

export default MusicList
