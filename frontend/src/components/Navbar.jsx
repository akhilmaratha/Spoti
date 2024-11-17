import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";
import { assets } from "../assets/assets";
import { FaBars } from "react-icons/fa";
const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { logoutUser } = UserData();

  return (
    <div className="flex items-center justify-center p-3 w-full">
      <div className="p-5 flex items-center justify-center">
        <FaBars
          className={`text-white cursor-pointer ${
            isSidebarOpen ? "hidden" : "block lg:hidden"
          }`}
          size={24}
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full">
        <div className="w-full flex items-center justify-start md:justify-between gap-5 font-semibold">
          <div className="flex items-center gap-2">
            <img
              src={assets.arrow_left}
              className="w-6 sm:w-8 bg-black p-1 sm:p-2 rounded-2xl cursor-pointer"
              alt=""
              onClick={() => navigate(-1)}
            />
            <img
              src={assets.arrow_right}
              className="w-6 sm:w-8 bg-black p-1 sm:p-2 rounded-2xl cursor-pointer"
              alt=""
              onClick={() => navigate(+1)}
            />
          </div>
          <div className="flex items-center justify-start gap-2 ">
            <p
              className="bg-white text-black text-[13px] sm:text-[15px] px-3 sm:px-5 py-1 sm:py-2 rounded-2xl cursor-pointer"
              onClick={logoutUser}
            >
              Logout
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-4 w-full">
          <p
            onClick={() => navigate("/")}
            className="bg-white text-black px-3 sm:px-4 py-1 rounded-2xl cursor-pointer"
          >
            All
          </p>
          <p
            onClick={() => navigate("/playlist")}
            className="bg-white text-black px-3 sm:px-4 py-1 rounded-2xl cursor-pointer"
          >
            PlayList
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
