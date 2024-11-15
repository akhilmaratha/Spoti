// import React from 'react';
import { Play } from 'lucide-react';

function AlbumCard({ title, description }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
      <div className="relative mb-4">
        <img src="/placeholder.svg" alt="Album cover" className="w-full h-auto rounded" />
        <button className="absolute bottom-2 right-2 bg-green-500 text-black rounded-full p-2 hover:bg-green-400 hover:scale-105 transition-all">
          <Play size={20} />
        </button>
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default AlbumCard;