import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import { UserData } from "./context/User";
import Playlist from "./pages/Playlist";
import { Loading } from "./components/Loading";
import Album from "./pages/Album";
const App = () => {
  const { loading,user, isAuth } = UserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/playlist" element={isAuth ? <Playlist user={user}/> : <Login />} />
            <Route path="/album/:id" element={isAuth ? <Album user={user}/> : <Login />} />
            
            <Route path="/admin" element={isAuth? <Admin /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/register" element={isAuth ? <Home /> : <Register />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
export default App;
