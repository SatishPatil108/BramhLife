import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Play, Pause, SkipForward, SkipBack, Volume2, LucideChevronDown } from "lucide-react";
import useHomepage from "../Homepage/useHomepage";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const MusicPlayer = () => {
  const { musicId } = useParams();
  const { musicsDetails } = useHomepage();
  const audioRef = useRef(null);

  const music = musicsDetails?.musics.find(item => item.id === Number(musicId));

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState("0:00");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [volume, setVolume] = useState(1);

  const [openDesc, setOpenDesc] = useState(true);
  const toggleDescription = (index) => {
    setOpenDesc(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!music) return;
    const audio = audioRef.current;
    audio.src = `${BASE_URL}${music.music_file}`;

    audio.onloadedmetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const updateTime = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(formatTime(audio.currentTime));
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [music]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const forward = () => {
    audioRef.current.currentTime += 10;
  };

  const changeProgress = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const progressValue = (audio.currentTime / audio.duration) * 100;
    setProgress(progressValue);

    setCurrentTime(formatTime(audio.currentTime));
    setDuration(formatTime(audio.duration));
  };

  const changeVolume = (e) => {
    const audio = audioRef.current;
    audio.volume = e.target.value;
    setVolume(e.target.value);
  };

  if (!music) {
    return <p className="text-center text-gray-700 mt-10">Music not found...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 text-center">
      <img
        src={`${BASE_URL}${music.music_thumbnail}`}
        alt={music.music_title}
        className="w-full h-80 object-cover rounded-xl shadow-lg mb-4"
      />

      <div className="flex justify-center cursor-pointer mb-2"
        onClick={() => setOpenDesc(!openDesc)}>

        <h2 className="text-2xl font-bold text-gray-900 mb-1">{music.music_title}</h2>
        <LucideChevronDown
          className={`${openDesc ? "rotate-180" : ""} transition-all duration-500 w-7 h-7 text-gray-400 mx-4`}
        />
      </div>
      {openDesc && (
        <p className="text-gray-500 text-sm mt-3 transition-all duration-500">
          {music.music_description}
        </p>
      )}

      {/* Progress Bar */}
      <div className="flex items-center gap-2 text-gray-600 text-xs mb-2 mt-3">
        <span>{currentTime}</span>
        <input
          type="range"
          value={isNaN(progress) ? 0 : progress}
          onChange={changeProgress}
          className="flex-1 accent-purple-600 cursor-pointer"
        />
        <span>{duration}</span>
      </div>

      {/* Player Controls */}
      <div className="flex justify-center items-center gap-6 mt-6">
        <button onClick={rewind} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <SkipBack size={18} className="text-purple-600" />
        </button>

        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-500 transition-all"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <button onClick={forward} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition">
          <SkipForward size={18} className="text-purple-600" />
        </button>

        <div className="flex items-center gap-2 justify-center">
          <Volume2 className="text-purple-600" />
          <input
            type="range"
            value={volume}
            min="0"
            max="1"
            step="0.01"
            onChange={changeVolume}
            className="w-22 accent-purple-600"
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={`${BASE_URL}${music.music_audio}`}
        onTimeUpdate={changeProgress}
        onLoadedMetadata={changeProgress}
      />
    </div>
  );
};

export default MusicPlayer;