// import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { VscLibrary } from "react-icons/vsc";
import NavItem from './Navbar';


function Sidebar({ isOpen, setIsOpen }) {
  return (
    <aside className={`bg-black w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
      <div className="p-6">
        <button onClick={() => setIsOpen(false)} className="md:hidden mb-4 text-gray-400 hover:text-white">
          Close
        </button>
        <nav className="space-y-4">
          <NavItem icon={<AiOutlineHome />} label="Home" active />
          <NavItem icon={<BiSearch />} label="Search" />
          <NavItem icon={<VscLibrary />} label="Your Library" />
        </nav>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Create Your First Playlist</h2>
          <p className="text-sm text-gray-400 mb-4">It's easy, well help you</p>
          <button className="w-full py-2 px-4 rounded bg-white text-black font-semibold hover:bg-opacity-80 transition-colors">
            Create playlist
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Lets find some podcast to follow</h2>
          <p className="text-sm text-gray-400 mb-4">We ll keep you updated on new episodes</p>
          <button className="w-full py-2 px-4 rounded bg-white text-black font-semibold hover:bg-opacity-80 transition-colors">
            Browse podcasts
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;