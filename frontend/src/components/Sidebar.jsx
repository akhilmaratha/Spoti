import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../context/User";
import { FaHome, FaSearch, FaMusic, FaPlus, FaArrowRight } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const { user } = UserData();

  return (
    <div className={`h-full p-2 flex-col gap-2 text-white ${isOpen ? 'absolute w-[50%] top-0 left-0 z-50 overflow-hidden' : 'hidden lg:flex'}`}>
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
          <FaHome size={20} />
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/")} className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
          <FaSearch size={20} />
          <span>Search</span>
        </button>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center hover:bg-gray-700 rounded justify-between">
          <button className="flex items-center gap-5 p-2 rounded">
            <FaMusic size={20} />
            <span className="font-bold text-lg">Your Library</span>
          </button>
          <div className="flex items-center gap-3">
            <FaArrowRight className="w-6 text-white" size={20} />
            <FaPlus className="w-6 text-white" size={20} />
          </div>
        </div>
        <div onClick={() => navigate("/playlist")}>
          <PlayListCard />
        </div>

        {user && user.role === "admin" && (
          <button
            className="w-full py-2 mt-10 px-4 rounded bg-white text-black font-semibold hover:bg-opacity-80 transition-colors"
            onClick={() => navigate("/admin")}
          >
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
