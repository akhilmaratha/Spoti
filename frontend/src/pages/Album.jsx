import  { useEffect } from "react";
import Layout from "../components/Layout";
import { SongData } from "../context/Song";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { UserData } from "../context/User";
import { FaBookmark, FaPlay } from "react-icons/fa";

const Album = () => {
  const {
    fetchAlbumSong,
    albumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
  } = SongData();

  const params = useParams();

  useEffect(() => {
    fetchAlbumSong(params.id);
  }, [params.id,fetchAlbumSong]);

  const onclickHander = (id) => {
    setSelectedSong(id);
    setIsPlaying(true);
  };

  const { addToPlaylist } = UserData();

  const savePlayListHandler = (id) => {
    addToPlaylist(id);
  };
  return (
    <Layout>
      {albumData && (
        <>
          <div className="mt-10 flex gap-8 flex md:flex-row md:items-center">
            {albumData.thumbnail && (
              <img 
              loading="lazy"
                src={albumData.thumbnail.url}
                className="w-48 rounded"
                alt=""
              />
            )}

            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                {albumData.title} PlayList
              </h2>
              <h4>{albumData.description}</h4>
              <p className="mt-1">
                <img
                  src={assets.spotify_logo}
                  className="inline-block w-6"
                  alt=""
                />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p>
              <b className="mr-4">#</b>
            </p>
            <p>Artist</p>
            <p className="hidden sm:block">Description</p>
            <p className="text-center">Actions</p>
          </div>

          <hr />
          {albumSong &&
            albumSong.map((e, i) => (
              <div
                className="grid grid-cols-3 sm:grid-cols-4 mt-4 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] h-20 items-center cursor-pointer"
                key={i}
                // style={{ height: '100px' }} // Set a fixed height for each song
              >
                <p className="text-white flex items-center">
                  <b className="mr-4 text-[#a7a7a7]">{i + 1}</b>
                  <div className="inline-block w-14 h-14 mr-5 rounded-sm overflow-hidden">
                    <img
                      src={e.thumbnail?.url || assets.noimage}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  {e.title}
                </p>
                <p className="text-[15px]">{e.singer}</p>
                <p className="text-[15px] hidden sm:block">
                  {e.description.slice(0, 20)}...
                </p>
                <p className="flex justify-center items-center gap-5">
                  <p
                    className="text-[15px] text-center"
                    onClick={() => savePlayListHandler(e._id)}
                  >
                    <FaBookmark  size={15}/>
                  </p>
                  <p
                    className="text-[15px] text-center"
                    onClick={() => onclickHander(e._id)}
                  >
                    <FaPlay size={15}/>
                  </p>
                </p>
              </div>
            ))}
        </>
      )}
    </Layout>
  );
};

export default Album;
