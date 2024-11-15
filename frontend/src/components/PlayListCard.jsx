// import React from 'react';
import { MdMenu } from "react-icons/md";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AlbumCard from './AlbumItem';

function MainContent({ setIsSidebarOpen }) {
  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
      <header className="flex justify-between items-center p-4 sticky top-0 bg-black bg-opacity-70 z-10">
        <div className="flex items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="mr-4 text-gray-400 hover:text-white md:hidden">
            <MdMenu />
          </button>
          <button className="mr-2 text-gray-400 hover:text-white"><MdChevronLeft /></button>
          <button className="text-gray-400 hover:text-white"><MdChevronRight /></button>
        </div>
        <div className="flex space-x-4">
          <button className="py-2 px-4 rounded-full bg-white text-black font-semibold hover:bg-opacity-80 transition-colors">
            Explore Premium
          </button>
          <button className="py-2 px-4 rounded-full bg-black text-white font-semibold border border-white hover:bg-white hover:text-black transition-colors">
            Install App
          </button>
        </div>
      </header>
      <section className="p-6">
        <h1 className="text-3xl font-bold mb-6">Recently Played</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          <AlbumCard title="Top 50 - Global" description="Your daily updates of the most played tracks..." />
        </div>
        <h1 className="text-3xl font-bold mb-6">Trending Now Near You</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AlbumCard title="Top 50 - Global" description="Your daily updates of the most played tracks..." />
          <AlbumCard title="Top 50 - Global" description="Your daily updates of the most played tracks..." />
          <AlbumCard title="Top 50 - Global" description="Your daily updates of the most played tracks..." />
          <AlbumCard title="Top 50 - Global" description="Your daily updates of the most played tracks..." />
          <AlbumCard title="Top 50 - Global" description="Your daily updates of the most played tracks..." />
        </div>
      </section>
    </main>
  );
}

export default MainContent;