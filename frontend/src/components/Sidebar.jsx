import { useNavigate } from "react-router-dom";
import PlayListCard from "./PlayListCard";
import { UserData } from "../context/User";
import { FaHome, FaSearch, FaMusic, FaPlus, FaArrowRight } from 'react-icons/fa';
const Sidebar = () => {
  const navigate = useNavigate();

  const { user } = UserData();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <button  onClick={() => navigate("/")}
         className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
          <FaHome size={20}/>
          <span>Home</span>
        </button>
        <button 
        onClick={() => navigate("/")}
         className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
          <FaSearch size={20} />
          <span>Search</span>
        </button>   
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center hover:bg-gray-700 rounded justify-between">
        <button className="flex items-center gap-2 p-2  rounded">
          <FaMusic size={20}/>
          <span>Your Library</span>
        </button>
          <div className="flex items-center gap-3">
            <FaArrowRight className="w-6 text-white" size={20}/>
            <FaPlus className="w-6 text-white" size={20} />
          </div>
        </div>
        <div onClick={() => navigate("/playlist")}>
          <PlayListCard />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Let&apos;s find some podcasts to follow</h2>
          <p className="text-sm text-gray-400 mb-4">We&apos;ll keep you updated on new episodes</p>
          <button className="w-full py-2 px-4 rounded bg-white text-black font-semibold hover:bg-opacity-80 transition-colors">
            Browse podcasts
          </button>
        </div>

        {user && user.role === "admin" && (
          <button
            className="px-4 py-1.5 bg-white text-black text-[15px] rounded-full mt-4"
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
