import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash } from "react-icons/fa";
import CustomTable from "@/components/CustomTable";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import FileUploaderWithPreview from '@/components/FileUploaderWithPreview/FileUploaderWithPreview';
import AudioUploaderWithPreview from '@/components/AudioFileUploaderPreview/AudioUploaderWithPreview';
import { fetchAllMusicsAPI, postMusicAPI } from '@/store/feature/admin';
import useMusicList from './useMusicList';
import usePagination from '@/hooks';


const MusicList = () => {
    const dispatch = useDispatch();
    const { pageNo, pageSize, nextPage, prevPage } = usePagination(1, 6);
    const { audioList } = useMusicList(pageNo, pageSize);
    console.log(audioList);

    const [musicDetails, setMusicDetails] = useState({
        songName: '',
        songInfo: '',
        songThumbnail: null,
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
        if (window.confirm("Are you sure you want to delete this Audio meditation song?")) {
            const toastId = toast.loading('Deleting a FAQs...');

            await dispatch(deleteFAQAPI(id)).unwrap().then(() => {
                toast.update(toastId, {
                    render: "Audio mediation song is Deleted Successfully 🎉",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            }).catch((error) => {
                console.error(error);
                toast.update(toastId, {
                    render: "Failed to Delete a Audio mediation song!!",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                })
            });
            dispatch(fetchAllMusicsAPI({ pageNo, pageSize }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                const toastId = toast.loading('Editing the FAQs....');

                await dispatch(
                    // updateFAQAPI({
                    //     faqId: formData.id,
                    //     faqData: { question: formData.question, answer: formData.answer },
                    // })
                ).unwrap().then(() => {
                    toast.update(toastId, {
                        render: "FAQs is Updated Successfully 🎉",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });
                }).catch(() => {
                    console.error(error);
                    toast.update(toastId, {
                        render: "Failed to Update a FAQs!!",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    })
                });
            } else {
                console.log(musicDetails);
                const formData = new FormData();
                formData.append("music_title", musicDetails.songName);
                formData.append("music_description", musicDetails.songInfo);
                if (musicDetails.songFile) {
                    formData.append("music_file", musicDetails.songFile);
                }
                if (musicDetails.songThumbnail) {
                    formData.append("music_thumbnail", musicDetails.songThumbnail);
                }

                const toastId = toast.loading("adding new music audio............");
                await dispatch(postMusicAPI(formData)).unwrap().then(() => {
                    toast.update(toastId, {
                        render: "New meditation audio  is added successfully 🎉",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                    });
                }).catch((error) => {
                    console.error(error);
                    toast.update(toastId, {
                        render: "Failed to add new meditation audio!!",
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                });
            }

            setIsDrawerOpen(false);

        } catch (error) {
            console.error("Failed to save FAQ:", error);
        }
    };

    useEffect(()=>{
        dispatch(fetchAllMusicsAPI({pageNo,pageSize}));
    },[dispatch,pageNo,pageSize])

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
                                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500  transition
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
                                    className="mt-1 block w-full text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-4 py-2  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500  transition
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
                                <FileUploaderWithPreview
                                    name="backGroundImg"
                                    imageFile={musicDetails.songThumbnail}
                                    setImageFile={(file) =>
                                        setMusicDetails(prev => ({
                                            ...prev,
                                            songThumbnail: file
                                        }))
                                    }
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-base font-medium text-gray-800 dark:text-gray-100">
                                    Upload Audio Song
                                </label>
                                <AudioUploaderWithPreview
                                    name='songFile'
                                    audioFile={musicDetails.songFile}
                                    setAudioFile={(file) => {
                                        setMusicDetails(prev => ({
                                            ...prev,
                                            songFile: file
                                        }))
                                    }}
                                />
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
