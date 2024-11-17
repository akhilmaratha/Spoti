import  { useEffect, useState } from "react";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import { UserData } from "../context/User";
import { SongData } from "../context/Song";
import "../index.css";

const SongItem = ({ image, name, desc, id }) => {
  const [saved, setSaved] = useState(false);

  const { addToPlaylist, user } = UserData();

  const { setSelectedSong, isPlaying, setIsPlaying } = SongData();

  const playList = user.playlist;

  useEffect(() => {
    if (playList && playList.includes(id)) {
      setSaved(true);
    }
  }, [user]);

  const savetoPlaylistHandler = () => {
    setSaved(!saved);
    addToPlaylist(id);
  };
  return (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors w-[180px] flex-shrink-0">
      <div className="relative mb-4">
        <div className="aspect-square w-full overflow-hidden rounded">
          <img 
            src={image} 
            className="w-full h-full object-cover" 
            alt={name} 
          />
        </div>
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button 
            className="bg-green-500 text-black rounded-full p-2 hover:bg-green-400 hover:scale-105 transition-all"
            onClick={() => {
              setSelectedSong(id);
              setIsPlaying(true);
            }}
          >
            <FaPlay size={20} />
          </button>
          <button
            className="bg-green-500 text-black rounded-full p-2 hover:bg-green-400 hover:scale-105 transition-all"
            onClick={savetoPlaylistHandler}
          >
            {saved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
          </button>
        </div>
      </div>
      <h3 className="font-semibold mb-1">{name}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
};

export default SongItem;
