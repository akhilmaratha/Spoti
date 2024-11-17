import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Song";
import { BiPlay, BiPause, BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import { assets } from "../assets/assets";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    nextMusic,
    prevMusic,
  } = SongData();

  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setProgress(audio.currentTime);

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleProgressChange = (e) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 shadow-lg">
      {song && (
        <div className="flex items-center justify-between w-full px-10 mx-auto">
          <div className="flex items-center space-x-4 w-1/4">
            <img
              src={song.thumbnail ? song.thumbnail.url : assets.noimage}
              alt="Album cover"
              className="w-14 h-14 rounded-lg shadow-md"
            />
            <div>
              <h3 className="font-bold text-base truncate">{song.title}</h3>
              <p className="text-sm text-purple-300 truncate">
                {song.description && song.description.slice(0, 30)}...
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center w-1/2">
            <div className="flex items-center space-x-4 mb-3">
              <button
                className="text-purple-300 hover:text-white transition-colors"
                onClick={prevMusic}
              >
                <BiSkipPrevious size={30} />
              </button>
              <button
                className="bg-white text-purple-900 rounded-full p-2 hover:bg-purple-100 transition-all transform hover:scale-105"
                onClick={handlePlayPause}
              >
                {isPlaying ? <BiPause size={24} /> : <BiPlay size={24} />}
              </button>
              <button
                className="text-purple-300 hover:text-white transition-colors"
                onClick={nextMusic}
              >
                <BiSkipNext size={30} />
              </button>
            </div>

            <div className="w-full flex items-center space-x-4">
              <span className="text-xs text-purple-300 w-10 text-right">
                {formatTime(progress)}
              </span>
              <div className="relative flex-1 h-2 bg-purple-700 rounded-full overflow-hidden">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(progress / duration) * 100 || 0}
                  onChange={handleProgressChange}
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(progress / duration) * 100 || 0}%` }}
                ></div>
              </div>
              <span className="text-xs text-purple-300 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 w-1/4 justify-end">
            {volume > 0 ? (
              <BsVolumeUp size={20} className="text-purple-300" />
            ) : (
              <BsVolumeMute size={20} className="text-purple-300" />
            )}
            <div className="relative w-24 h-1 bg-purple-700 rounded-full overflow-hidden">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      {song && song.audio && (
        <audio ref={audioRef} src={song.audio.url} autoPlay={isPlaying} />
      )}
    </div>
  );
};

export default Player;