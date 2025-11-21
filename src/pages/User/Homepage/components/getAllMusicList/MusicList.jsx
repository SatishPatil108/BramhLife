import React, { useRef, useState } from "react";
import { Play, Pause, SquarePen, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import useHomepage from "../../useHomepage";
const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const MusicList = () => {
    const { loading, error, musicsDetails } = useHomepage();
    const musics = musicsDetails.musics;


    const getAudioDuration = (url) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio();

            audio.src = url;

            audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration); // duration in seconds
            });

            audio.addEventListener("error", (e) => {
                reject("Unable to load audio");
            });
        });
    };

    // Usage:
    getAudioDuration("https://your-url/music.mp3")
        .then(duration => {
            console.log("Duration (seconds):", duration);
            console.log("Minutes:", (duration / 60).toFixed(2));
        })
        .catch(err => console.error(err));


    return (
        <div className="bg-gradient-to-b from-pink-50 to-purple-50 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 mt-4 px-4">
                Sounds and Musics
            </h2>

            {/* Loading / Error */}
            {loading ? (
                <p className="text-center text-gray-500">Loading music...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : musics.length === 0 ? (
                <p className="text-center text-gray-500">No music found!</p>
            ) : (
                <div
                    className="flex gap-5 py-2 overflow-x-auto scroll-smooth
                   snap-x snap-mandatory mb-8 px-6 scrollbar-hide"
                >
                    {musics.map((music) => (
                        <div
                            key={music.id}
                            className="min-w-[250px] max-w-[260px] bg-white dark:bg-gray-800
                           rounded-xl shadow overflow-hidden relative flex-shrink-0
                           snap-center"
                        >
                            {/* Thumbnail */}
                            <div className="relative w-full h-40 sm:h-44 bg-black">
                                <img
                                    src={`${BASE_URL}${music.music_thumbnail}`}
                                    className="w-full h-full object-cover"
                                    alt={music.music_title}
                                />
                                <p>{}</p>
                            </div>

                            {/* Title */}
                            <div className="p-4 pb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {music.music_title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MusicList;
