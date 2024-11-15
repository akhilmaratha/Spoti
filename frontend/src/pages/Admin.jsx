import { useState } from "react";
import { UserData } from "../context/User";
import { useNavigate, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { SongData } from "../context/Song";

export default function Admin() {
  const {
    albums,
    songs,
    addAlbum,
    loading,
    addSong,
    addThumbnail,
    deleteSong,
  } = SongData();
  const { user } = UserData();
  const navigate = useNavigate();
  
  // Separate state for album form
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  
  // Separate state for song form
  const [songTitle, setSongTitle] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [singer, setSinger] = useState("");
  const [album, setAlbum] = useState("");
  
  const [file, setFile] = useState(null);

  if (user && user.role !== "admin") return navigate("/");

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleAlbumSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", albumTitle);
    formData.append("description", albumDescription);
    formData.append("file", file);
    addAlbum(formData, setAlbumTitle, setAlbumDescription, setFile);
  };

  const handleSongSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", songTitle);
    formData.append("description", songDescription);
    formData.append("singer", singer);
    formData.append("album", album);
    formData.append("file", file);
    addSong(formData, setSongTitle, setSongDescription, setFile, setSinger, setAlbum);
  };

  const addThumbnailHandler = (id) => {
    const formData = new FormData();
    formData.append("file", file);
    addThumbnail(id, formData, setFile);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      deleteSong(id);
    }
  };

  const handleAlbumChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setAlbumTitle(value);
    if (name === "description") setAlbumDescription(value);
  };

  const handleSongChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setSongTitle(value);
    if (name === "description") setSongDescription(value);
    if (name === "singerName") setSinger(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12">
      <Link
        to="/"
        className="fixed top-4 left-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors duration-300 no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span>Home</span>
      </Link>

      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6 text-green-400">
              Spotify Music Management System
            </h1>

            {/* Album Section */}
            <form onSubmit={handleAlbumSubmit} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Create Album
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="albumTitle"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Album Title
                  </label>
                  <input
                    type="text"
                    id="albumTitle"
                    name="title"
                    value={albumTitle}
                    onChange={handleAlbumChange}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="albumDescription"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Album Description
                  </label>
                  <textarea
                    id="albumDescription"
                    name="description"
                    value={albumDescription}
                    onChange={handleAlbumChange}
                    rows={3}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                    required
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="albumFile"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Album Cover
                  </label>
                  <input
                    type="file"
                    id="albumFile"
                    accept="image/*"
                    onChange={fileChangeHandler}
                    className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-gray-700 hover:file:bg-green-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Please Wait..." : "Create Album"}
                </button>
              </div>
            </form>

            {/* Song Section */}
            <form onSubmit={handleSongSubmit} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-green-400">
                Add Song
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="songTitle"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Song Title
                  </label>
                  <input
                    type="text"
                    id="songTitle"
                    name="title"
                    value={songTitle}
                    onChange={handleSongChange}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="songDescription"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Song Description
                  </label>
                  <textarea
                    id="songDescription"
                    name="description"
                    value={songDescription}
                    onChange={handleSongChange}
                    rows={3}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                    required
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="singerName"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Singer Name
                  </label>
                  <input
                    type="text"
                    id="singerName"
                    name="singerName"
                    value={singer}
                    onChange={handleSongChange}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="songFile"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Song File (MP3)
                  </label>
                  <input
                    type="file"
                    id="songFile"
                    accept=".mp3"
                    onChange={fileChangeHandler}
                    className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-gray-700 hover:file:bg-green-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="albumSelect"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Select Album
                  </label>
                  <select
                    id="albumSelect"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                  >
                    <option value="">Choose Album</option>
                    {albums &&
                      albums.map((e, i) => (
                        <option value={e._id} key={i}>
                          {e.title}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Please Wait..." : "Add Song"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-center text-green-400">Added Songs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs &&
            songs.map((e, i) => (
              <div
                key={i}
                className="bg-[#181818] p-4 rounded-lg shadow-md flex flex-col"
              >
                {e.thumbnail ? (
                  <img
                    src={e.thumbnail.url}
                    alt={e.title}
                    className="w-full h-48 object-cover rounded-md mb-3"
                    onError={(e) => {
                      e.target.src = 'fallback-image-url';
                      console.error('Image failed to load');
                    }}
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2 mb-3">
                    <input 
                      type="file" 
                      onChange={fileChangeHandler}
                      accept="au/*" 
                      className="w-full"
                    />
                    <button
                      onClick={() => addThumbnailHandler(e._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full transition-colors duration-300"
                      disabled={!file}
                    >
                      Add Thumbnail
                    </button>
                  </div>
                )}

                <h4 className="text-lg font-bold mb-1">{e.title}</h4>
                <p className="text-sm text-gray-400 mb-1">{e.singer}</p>
                <p className="text-sm text-gray-400 mb-3">{e.description}</p>

                <button
                  onClick={() => deleteHandler(e._id)}
                  className="mt-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <MdDelete /> Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
