// import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
// import MainContent from '../components/MainContent';
import PlayListCard from '../components/PlayListCard';
import PlaybackControls from '../components/Player';
import { useState } from 'react';

function SpotifyHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <PlayListCard  setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      <PlaybackControls />
    </div>
  );
}

export default SpotifyHome;