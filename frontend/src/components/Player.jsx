import { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Song";
import { 
  BiPlay, 
  BiPause, 
  BiSkipPrevious, 
  BiSkipNext, 
  BiRepeat, 
  BiShuffle 
} from "react-icons/bi";
import { 
  BsLaptop, 
  BsVolumeUp, 
  // BsArrowsAngleExpand 
} from "react-icons/bs";
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

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [song]);

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };
  return (
    <div>
      {song && (
        <footer className="fixed bottom-0 w-full h-[13vh] bg-gray-900 border-t border-gray-800 flex items-center px-4 py-1">
          <div className="flex items-center flex-1 ">
            <img 
              src={song.thumbnail ? song.thumbnail.url : assets.noimage} 
              alt="Album cover" 
              className="w-10 h-10 mr-4" 
            />
            <div>
              <h3 className="font-semibold text-gray-100">{song.title}</h3>
              <p className="text-sm text-gray-400">
                {song.description && song.description.slice(0, 30)}...
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center flex-1">
            {song && song.audio && (
              <audio ref={audioRef} src={song.audio.url} autoPlay={isPlaying} />
            )}
            
            <div className="flex items-center space-x-4 mb-2">
              <button className="text-gray-400 hover:text-white">
                <BiShuffle size={20} />
              </button>
              <button className="text-gray-400 hover:text-white" onClick={prevMusic}>
                <BiSkipPrevious size={24} />
              </button>
              <button 
                className="bg-white text-black rounded-full p-2 hover:bg-opacity-80 transition-colors"
                onClick={handlePlayPause}
              >
                {isPlaying ? <BiPause size={24} /> : <BiPlay size={24} />}
              </button>
              <button className="text-gray-400 hover:text-white" onClick={nextMusic}>
                <BiSkipNext size={24} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <BiRepeat size={20} />
              </button>
            </div>

            <div className="w-full flex items-center">
              <span className="text-xs text-gray-400 mr-2">
                {new Date(progress * 1000).toISOString().substr(14, 5)}
              </span>
              <div className="h-1 flex-1 bg-gray-800 rounded-full">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full"
                  value={(progress / duration) * 100}
                  onChange={handleProgressChange}
                />
              </div>
              <span className="text-xs text-gray-400 ml-2">
             {new Date(duration * 1000).toISOString().substr(14, 5)}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-1 justify-end">
            <BsLaptop size={20} className="text-gray-400" />
            <div className="flex items-center">
              <BsVolumeUp size={20} className="text-gray-400" />
              <div className="h-1 w-24 bg-gray-800 rounded-full ml-2">
                <input
                  type="range"
                  className="w-full"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
            {/* <BsArrowsAngleExpand size={20} className="text-gray-400" /> */}
          </div>
        </footer>
      )}
    </div>
  );
};

export default Player;
