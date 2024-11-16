import { MdBookmark, MdMoreHoriz, MdPlayCircleFilled } from "react-icons/md";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { useEffect, useState } from "react";
import { UserData } from "../context/User";

const Playlist = ({ user }) => {
  const { songs, setSelectedSong, setIsPlaying, setIndex } = SongData();
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    if (songs && user && Array.isArray(user.playlist)) {
      const filteredSongs = songs.filter((e) =>
        user.playlist.includes(e._id.toString())
      );
      setMyPlaylist(filteredSongs);
    }
  }, [songs, user]);

  const handlePlay = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
    const songIndex = songs.findIndex(song => song._id === id);
    if (songIndex !== -1) {
      setIndex(songIndex);
    }
  };
  
  const { addPlaylist } = UserData();
  const savePlaylist = (id) => {
    addPlaylist(id);
  };

  return (
    <Layout>
      <div className="bg-black text-white min-h-screen">
        <div className="flex items-end p-8 bg-gradient-to-b from-indigo-800 to-black h-80">
          {myPlaylist && myPlaylist[0] ? (
            <img
              src={myPlaylist[0].thumbnail?.url}
              alt={user.name}
              className="w-60 h-60 shadow-lg mr-6"
            />
          ) : (
            <img
              src="https://via.placeholder.com/240"
              alt="Playlist"
              className="w-60 h-60 shadow-lg mr-6"
            />
          )}
          <div>
            <p className="uppercase text-sm font-bold mb-2">Playlist</p>
            <h1 className="text-6xl font-bold mb-6">{user.name}'s Playlist</h1>
            <p className="text-sm opacity-70">
              Created by {user.name} • {myPlaylist.length} songs
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center mb-6">
            <button 
              className="text-5xl text-green-500 mr-8"
              onClick={() => myPlaylist[0] && handlePlay(myPlaylist[0]._id)}
            >
              <MdPlayCircleFilled />
            </button>
            <button className="text-3xl text-white opacity-70">
              <MdMoreHoriz />
            </button>
          </div>

          <table className="w-full text-left text-sm text-gray-400">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="pb-2">#</th>
                <th className="pb-2">Title</th>
                <th className="pb-2">Artist</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPlaylist &&
                myPlaylist.map((song, i) => (
                  <tr key={i} className="hover:bg-gray-800">
                    <td className="py-5">{i + 1}</td>
                    <td className="py-5 flex items-center">
                      <img 
                        src={song.thumbnail.url} 
                        alt={song.title} 
                        className="w-16 h-16 mr-4"
                      />
                      {song.title}
                    </td>
                    <td className="py-5">{song.singer}</td>
                    <td className="py-5">{song.description.slice(0, 20)}...</td>
                    <td className="py-5">
                      <div className="flex items-center gap-5">
                        <button onClick={() => savePlaylist(song._id)}>
                          <MdBookmark  size={25}/>
                        </button>
                        <button onClick={() => handlePlay(song._id)}>
                          <MdPlayCircleFilled size={25}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Playlist;
