import React, { useRef, useState } from "react";
import { Play, Pause, SquarePen, Trash2, LucideArrowUpRightFromSquare } from "lucide-react";
import { motion } from "framer-motion";
import useHomepage from "../../useHomepage";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const MusicList = () => {
    const { loading, error, musicsDetails } = useHomepage();
    const musics = musicsDetails.musics;
    console.log(musicsDetails);

    
    const navigate = useNavigate();

    return (
        <div className="bg-purple-50 pb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            <h2 className="text-2xl font-bold mb-5 text-gray-800 mt-4 px-8">
                Sounds and Musics
            </h2>
            {/* Loading / Error */}
            {loading ? (
                <p className="text-center text-gray-500">Loading music...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error.message}</p>
            ) : musics.length === 0 ? (
                <p className="text-center text-gray-500">No music found!</p>
            ) : (
                <div
                    className="flex overflow-x-auto space-x-4 mt-8 pb-12 px-8 
             snap-x snap-mandatory scrollbar-hide"
                >
                    {musics.map((music) => (
                        <motion.div
                            key={music.id}
                            className="relative group rounded-lg overflow-hidden 
                            snap-center flex-shrink-0 w-60 h-60"
                            onClick={() => navigate(`/music/${music.id}`)}
                        >
                            <img
                                src={`${BASE_URL}${music.music_thumbnail}`}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 flex flex-col justify-end p-4 
                          text-white bg-black/50 opacity-100 group-hover:opacity-60 
                            transition-all duration-300">

                                <p className="absolute top-2 left-2 text-white text-sm font-bold px-2 py-1">
                                    {music.music_duration}
                                </p>

                                <h1 className="text-xl font-medium">{music.music_title}</h1>

                                <a href="#" className="flex items-center gap-1 text-sm text-white/70">
                                    Show More
                                    <LucideArrowUpRightFromSquare className="mx-2 w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MusicList;
