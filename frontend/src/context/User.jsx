import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setisAuth] = useState(false);
  const [bntLoading, setBtnLoading] = useState(false);
  const [loading, setloading] = useState(true);

  async function registerUser(name, email, password, navigate,fetchAlbum,fetchSong) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      toast.success(data.message);
      setUser(data.user);
      setisAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchAlbum();
      fetchSong();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function loginUser(email, password, navigate,fetchAlbum,fetchSong) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });
      toast.success(data.message);
      setUser(data.user);
      setisAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchAlbum();
      fetchSong();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function fetchUser() {
    try {
      const {data} =await axios.get("/api/user/me");
      setUser(data)
      setisAuth(true)
      setloading(false)
    } catch (error) {
      console.log(error)
      setisAuth(false)
      setloading(false)
    }
  }
  async function logoutUser() {
    try {
      const { data } = await axios.get("/api/user/logout");

      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
   async function addToPlaylist(id) {
    try {
      const { data } = await axios.post("/api/user/song/" + id);

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <UserContext.Provider value={{registerUser,user,isAuth,bntLoading,loading,loginUser,logoutUser,addToPlaylist}}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
