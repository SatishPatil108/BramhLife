import React, { useEffect, useRef, useState } from 'react';
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import FileUploaderWithPreview from '@/components/FileUploaderWithPreview/FileUploaderWithPreview';
import AudioUploaderWithPreview from '@/components/AudioFileUploaderPreview/AudioUploaderWithPreview';
import useMusicList from './useMusicList';
import usePagination from '@/hooks';
import { Pause, SquarePen, Trash2, Play } from 'lucide-react';

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const MusicList = () => {
    const dispatch = useDispatch();
    const { pageNo, pageSize, nextPage, prevPage } = usePagination(1, 6);
    const { audiosDetails, loading, error, addMusic, updateMusicDetails, deleteMusic } = useMusicList(pageNo, pageSize);

    const musics = audiosDetails.audios;

    const [musicDetails, setMusicDetails] = useState({
        songName: '',
        songInfo: '',
        songThumbnail: null,
        songFile: null,
        duration: ''
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [errors, setErrors] = useState({});
    const audioRef = useRef(null);

    // handle play pause
    const handlePlayPause = (filePath) => {
        const audioUrl = `${BASE_URL}${filePath}`;

        // If no audio exists yet
        if (!audioRef.current) {
            audioRef.current = new Audio(audioUrl);
            audioRef.current.play();
            setCurrentAudio(filePath);

            audioRef.current.onended = () => setCurrentAudio(null);
            return;
        }

        // If clicking same song → toggle pause / play
        if (currentAudio === filePath) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            return;
        }

        // Switching to a new audio
        audioRef.current.pause();
        audioRef.current = new Audio(audioUrl);
        audioRef.current.play();
        setCurrentAudio(filePath);

        audioRef.current.onended = () => setCurrentAudio(null);
    };


    const handleChange = (e) =>
        setMusicDetails({ ...musicDetails, [e.target.name]: e.target.value });

    const handleAddSongs = () => {
        setIsDrawerOpen(true);
        setIsEditing(false);
        setMusicDetails({
            songName: '',
            songInfo: '',
            songThumbnail: null,
            songFile: null,
            duration: ''
        });
    };

    const handleEditSong = (music) => {
        setIsEditing(true);
        setMusicDetails({
            songId: music.id,
            songName: music.music_title,
            songInfo: music.music_description,
            songThumbnail: music.music_thumbnail,
            songFile: music.music_file,
            duration: music.music_duration ?? ''
        });
        setIsDrawerOpen(true);
        setErrors({});
    };

    const handleDeleteSong = (id) => {
        console.log(id);
        if (!id) return;
        if (window.confirm("Are you sure you want to delete this song?")) {
            deleteMusic(id);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Music List Name
        if (!musicDetails.songName.trim()) {
            newErrors.songName = "Music list name is required.";
        }

        // Music Info
        if (!musicDetails.songInfo.trim()) {
            newErrors.songInfo = "Music information is required.";
        } else if (musicDetails.songInfo.trim().length < 20) {
            newErrors.songInfo = "Music information must be at least 10 characters.";
        }

        // Music Thumbnail
        if (!musicDetails.songThumbnail) {
            newErrors.songThumbnail = "Music thumbnail is required.";
        }

        // Music File
        if (!musicDetails.songFile) {
            newErrors.songFile = "Music file is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // 💾 Submit Form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const formData = new FormData();
            formData.append("music_title", musicDetails.songName);
            formData.append("music_description", musicDetails.songInfo);
            formData.append("music_duration", musicDetails.duration);

            if (musicDetails.songFile && typeof musicDetails.songFile === "object") {
                formData.append("music_file", musicDetails.songFile);
            }
            if (musicDetails.songThumbnail && typeof musicDetails.songThumbnail === "object") {
                formData.append("music_thumbnail", musicDetails.songThumbnail);
            }

            if (isEditing) {
                updateMusicDetails(musicDetails.songId, formData);
            } else {
                addMusic(formData);
            }
            setIsDrawerOpen(false);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Music List</h2>

                    <CustomButton
                        onClick={handleAddSongs}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Add New Song
                    </CustomButton>
                </div>

                {/* Loading / Error */}
                {loading ? (
                    <p className="text-center text-gray-500">Loading music...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : musics.length === 0 ? (
                    <p className="text-center text-gray-500">No music found!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {musics.map((music) => (
                            <div
                                key={music.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden relative "
                            >

                                {/* Thumbnail */}
                                <div className="relative w-full h-40 sm:h-44 bg-black">
                                    <img
                                        src={`${BASE_URL}${music.music_thumbnail}`}
                                        className="w-full h-full object-fit"
                                        alt={music.music_title}
                                    />

                                    <button
                                        onClick={() => handlePlayPause(music.music_file)}
                                        className="absolute cursor-pointer bottom-3 right-3 bg-indigo-600 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-indigo-700"
                                    >
                                        {currentAudio === music.music_file && !audioRef.current?.paused ? (
                                            <Pause size={20} />
                                        ) : (
                                            <Play size={20} />
                                        )}

                                    </button>
                                </div>

                                {/* Content with bottom padding so buttons never overlap */}
                                <div className="p-4 pb-16">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {music.music_title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 mt-2 text-base">
                                        {music.music_description}
                                    </p>

                                    {/* FIXED Edit + Delete Buttons */}
                                    <div className="absolute bottom-4 right-4 flex gap-3">
                                        <button
                                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700
                                            transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => handleEditSong(music)}
                                        >
                                            <SquarePen className="text-blue-600 dark:text-blue-300 w-5 h-5 cursor-pointer" />
                                        </button>

                                        <button
                                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700
                                            transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                                            onClick={() => handleDeleteSong(music.id)}
                                        >
                                            <Trash2 className="text-red-600 dark:text-red-300 w-5 h-5 cursor-pointer" />
                                        </button>
                                    </div>
                                </div>

                            </div>

                        ))}
                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-3 mt-10">
                            <button
                                onClick={prevPage}
                                disabled={!audiosDetails.has_prev_page}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                Prev
                            </button>
                            <span className="text-gray-700 dark:text-gray-300 font-medium px-4">
                                Page {audiosDetails.current_page}
                            </span>
                            <button
                                onClick={nextPage}
                                disabled={!audiosDetails.has_next_page}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Drawer Form */}
                {isDrawerOpen && (
                    <CustomDrawer
                        isOpen={isDrawerOpen}
                        onClose={() => setIsDrawerOpen(false)}
                        title={isEditing ? "Edit Song" : "Add New Song"}
                    >
                        <form onSubmit={handleSubmit} className="space-y-2">
                            {/* Coach Name */}
                            <div>
                                <label className="block font-medium mb-1">Audio Name</label>
                                <input
                                    type="text"
                                    name="songName"
                                    value={musicDetails.songName}
                                    onChange={handleChange}
                                    placeholder="Enter the song name"
                                    className={`w-full p-2.5 sm:p-3 rounded-md  text-gray-900 dark:text-gray-100 border bg-white dark:bg-gray-800
                             placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                                    ${errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                                        }`}
                                />
                                {errors.songName && <p className="text-red-500 text-base mb-2">{errors.songName}</p>}
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Audio Information</label>
                                <textarea
                                    name="songInfo"
                                    rows="4"
                                    value={musicDetails.songInfo}
                                    onChange={handleChange}
                                    placeholder="Enter the audio information"
                                    className={`w-full my-1 p-2.5 sm:p-3 border rounded-md shadow-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                                    placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200
                                    ${errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-purple-500 hover:border-purple-500"
                                        }`}
                                />
                                {errors.songInfo && <p className="text-red-500 text-base">{errors.songInfo}</p>}
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Audio Thumbnail</label>
                                <FileUploaderWithPreview
                                    imageFile={typeof musicDetails.songThumbnail === "object" ? musicDetails.songThumbnail : null}
                                    imageUrl={typeof musicDetails.songThumbnail === "string" ? musicDetails.songThumbnail : null}
                                    setImageFile={(file) =>
                                        setMusicDetails((prev) => ({ ...prev, songThumbnail: file }))
                                    }
                                />
                                {errors.songThumbnail && <p className="text-red-500 text-base">{errors.songThumbnail}</p>}
                            </div>

                            <div>
                                <label className="block font-medium">Audio File</label>
                                <AudioUploaderWithPreview
                                    audioFile={musicDetails.songFile}
                                    setDuration={(duration) => {
                                        setMusicDetails((prev) => ({ ...prev, duration: duration }))
                                    }}
                                    setAudioFile={(file) =>
                                        setMusicDetails((prev) => ({ ...prev, songFile: file }))
                                    }
                                />

                                {errors.songFile && <p className="text-red-500 text-base">{errors.songFile}</p>}
                            </div>

                            <CustomButton type="submit" className="w-full bg-green-600 text-white py-2 mt-3">
                                {isEditing ? "Update Song" : "Save Song"}
                            </CustomButton>
                        </form>
                    </CustomDrawer>
                )}

            </div>
        </div>
    );

};

export default MusicList;
