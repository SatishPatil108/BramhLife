import React, { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

const meditationAudios = [
    {
        id: 1,
        title: "Morning Calm",
        duration: "10 min",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
        id: 2,
        title: "Focus Breathing",
        duration: "8 min",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
        audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
        id: 3,
        title: "Sleep Deeply",
        duration: "12 min",
        image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
        audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
        id: 4,
        title: "Evening Reflection",
        duration: "15 min",
        image:
            "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
        audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
];

const MusicList = () => {
    const [currentAudio, setCurrentAudio] = useState(null);
    const audioRef = useRef(null);

    const handlePlayPause = (audioUrl) => {
        if (currentAudio === audioUrl) {
            // Pause current audio
            audioRef.current.pause();
            setCurrentAudio(null);
        } else {
            // Play new audio
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const newAudio = new Audio(audioUrl);
            newAudio.play();
            audioRef.current = newAudio;
            setCurrentAudio(audioUrl);
        }
    };

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-10  bg-gradient-to-b from-pink-50 to-purple-50">
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                🧘 Meditation Audios
            </h2>

            <div className="flex overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory gap-6 pb-4">
                {meditationAudios.map((audio) => (
                    <motion.div
                        key={audio.id}
                        whileHover={{ scale: 1.03 }}
                        className="w-[250px] sm:w-[300px] md:w-[320px] 
                flex-shrink-0 cursor-pointer bg-white snap-start group relative shadow-sm border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        <div className="relative overflow-hidden flex justify-center items-center h-[160px] bg-gray-50">
                            <img
                                src={audio.image}
                                alt={audio.title}
                                className="w-[100%] h-[100%] object-cover transform group-hover:scale-105 transition duration-500"
                            />
                            <button
                                onClick={() => handlePlayPause(audio.audioUrl)}
                                className="absolute bottom-3 right-3 bg-indigo-600 text-white p-2 sm:p-3 rounded-full shadow-md hover:bg-indigo-700"
                            >
                                {currentAudio === audio.audioUrl ? (
                                    <Pause size={20} />
                                ) : (
                                    <Play size={20} />
                                )}
                            </button>
                        </div>

                        <div className="p-3 sm:p-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition">
                                {audio.title}
                            </h3>
                            <p className="text-sm text-gray-500">{audio.duration}</p>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-10 transition duration-300"></div>

                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MusicList;
