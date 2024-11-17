import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Player from "./Player";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col ">
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black opacity-30 z-40"
              onClick={closeSidebar}
            />
          )}
          <div className={`flex-1 transition-all duration-300`}>
            <div className={`m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto`}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;
