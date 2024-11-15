// import React from 'react';
import { Play, SkipBack, SkipForward, Repeat, Shuffle, Laptop2, Volume2, Maximize2 } from 'lucide-react';

function PlaybackControls() {
  return (
    <footer className="h-20 bg-gray-900 border-t border-gray-800 flex items-center px-4">
      <div className="flex items-center flex-1">
        <img src="/placeholder.svg" alt="Album cover" className="w-14 h-14 mr-4" />
        <div>
          <h3 className="font-semibold">Daylight</h3>
          <p className="text-sm text-gray-400">David Kushner</p>
        </div>
      </div>
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center space-x-4 mb-2">
          <button className="text-gray-400 hover:text-white"><Shuffle /></button>
          <button className="text-gray-400 hover:text-white"><SkipBack /></button>
          <button className="bg-white text-black rounded-full p-2 hover:bg-opacity-80 transition-colors">
            <Play />
          </button>
          <button className="text-gray-400 hover:text-white"><SkipForward /></button>
          <button className="text-gray-400 hover:text-white"><Repeat /></button>
        </div>
        <div className="w-full flex items-center">
          <span className="text-xs text-gray-400 mr-2">0:00</span>
          <div className="h-1 flex-1 bg-gray-800 rounded-full">
            <div className="h-1 w-1/3 bg-white rounded-full"></div>
          </div>
          <span className="text-xs text-gray-400 ml-2">3:33</span>
        </div>
      </div>
      <div className="flex items-center space-x-4 flex-1 justify-end">
        <Laptop2 size={20} className="text-gray-400" />
        <div className="flex items-center">
          <Volume2 size={20} className="text-gray-400" />
          <div className="h-1 w-24 bg-gray-800 rounded-full ml-2">
            <div className="h-1 w-2/3 bg-white rounded-full"></div>
          </div>
        </div>
        <Maximize2 size={20} className="text-gray-400" />
      </div>
    </footer>
  );
}

export default PlaybackControls;