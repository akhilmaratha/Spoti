import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [songLoading, setSongLoading] = useState(true);

  
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  async function fetchSong() {
    try {
      const { data } = await axios.get("/api/song/all");
      setSongs(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function addAlbum(formdata, setTitle, setDescription, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/album/new", formdata);
      toast.success(data.message);
      setLoading(false);
      fetchAlbum();
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  async function addSong(
    formdata,
    setTitle,
    setDescription,
    setFile,
    setSinger,
    setAlbum
  ) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/song/new", formdata);
      toast.success(data.message);
      setLoading(false);
      fetchSong();
      setTitle("");
      setDescription("");
      setFile(null);
      setSinger("");
      setAlbum("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating song");
      setLoading(false);
    }
  }
  async function addThumbnail(id, formdata, setFile) {
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/song/${id}`, formdata);
      toast.success(data.message);
      setLoading(false);
      fetchSong();
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding thumbnail");
      setLoading(false);
    } 
  }
  const [albums, setAlbums] = useState([]);

  async function fetchAlbum() {
    try {
      const { data } = await axios.get("/api/song/album/all");
      setAlbums(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteSong(id) {
    try {
      const { data } = await axios.delete("/api/song/" + id);

      toast.success(data.message);
      fetchSong();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchSong();
    fetchAlbum();
  }, []);
  const [index, setIndex] = useState(0);

  function nextMusic() {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]._id);
    } else {
      setIndex(index + 1);
      setSelectedSong(songs[index + 1]._id);
    }
  }
  function prevMusic() {
    if (index === 0) {
      return null;
    } else {
      setIndex(index - 1);
      setSelectedSong(songs[index - 1]._id);
    }
  }

  const [albumSong, setAlbumSong] = useState([]);
  const [albumData, setAlbumData] = useState([]);

  async function fetchAlbumSong(id) {
    try {
      const { data } = await axios.get("/api/song/album/" + id);
      setAlbumSong(data.songs);
      setAlbumData(data.album);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SongContext.Provider
      value={{ songs, addAlbum, loading, songLoading, albums, addSong,addThumbnail,fetchAlbumSong,albumSong,albumData,selectedSong,isPlaying,nextMusic,prevMusic,deleteSong }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const SongData = () => useContext(SongContext);
