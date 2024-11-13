import  { useState } from 'react';
import { UserData } from '../context/User';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const {user} = UserData();
    const navigate = useNavigate();
    const [album, setAlbum] = useState({ title: '', description: '', file: null });
    const [song, setSong] = useState({ title: '', description: '', singerName: '', file: null });
    const [thumbnail, setThumbnail] = useState({ file: null });

    if(user && user.role !== "admin") return navigate("/");
    
    const handleAlbumChange = (e) => {
        const { name, value } = e.target;
        setAlbum(prev => ({ ...prev, [name]: value }));
    };

    const handleAlbumFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAlbum(prev => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const handleSongChange = (e) => {
        const { name, value } = e.target;
        setSong(prev => ({ ...prev, [name]: value }));
    };

    const handleSongFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSong(prev => ({ ...prev, file: e.target.files[0] }));
        }
    };

    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnail({ file: e.target.files[0] });
        }
    };

    const handleAlbumSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Album:', album);
        setAlbum({ title: '', description: '', file: null });
        alert('Album created successfully!');
    };

    const handleSongSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Song:', song);
        setSong({ title: '', description: '', singerName: '', file: null });
        alert('Song added successfully!');
    };

    const handleThumbnailSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Thumbnail:', thumbnail);
        setThumbnail({ file: null });
        alert('Thumbnail added successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold text-center mb-6 text-green-400">Spotify Music Management System</h1>
                        
                        {/* Album Section */}
                        <form onSubmit={handleAlbumSubmit} className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-green-400">Create Album</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="albumTitle" className="block text-sm font-medium text-gray-300">Album Title</label>
                                    <input
                                        type="text"
                                        id="albumTitle"
                                        name="title"
                                        value={album.title}
                                        onChange={handleAlbumChange}
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="albumDescription" className="block text-sm font-medium text-gray-300">Album Description</label>
                                    <textarea
                                        id="albumDescription"
                                        name="description"
                                        value={album.description}
                                        onChange={handleAlbumChange}
                                        rows={3}
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="albumFile" className="block text-sm font-medium text-gray-300">Album Cover</label>
                                    <input
                                        type="file"
                                        id="albumFile"
                                        onChange={handleAlbumFileChange}
                                        className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-gray-700 hover:file:bg-green-300"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Create Album
                                </button>
                            </div>
                        </form>

                        {/* Song Section */}
                        <form onSubmit={handleSongSubmit} className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-green-400">Add Song</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="songTitle" className="block text-sm font-medium text-gray-300">Song Title</label>
                                    <input
                                        type="text"
                                        id="songTitle"
                                        name="title"
                                        value={song.title}
                                        onChange={handleSongChange}
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="songDescription" className="block text-sm font-medium text-gray-300">Song Description</label>
                                    <textarea
                                        id="songDescription"
                                        name="description"
                                        value={song.description}
                                        onChange={handleSongChange}
                                        rows={3}
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="singerName" className="block text-sm font-medium text-gray-300">Singer Name</label>
                                    <input
                                        type="text"
                                        id="singerName"
                                        name="singerName"
                                        value={song.singerName}
                                        onChange={handleSongChange}
                                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="songFile" className="block text-sm font-medium text-gray-300">Song File (MP3)</label>
                                    <input
                                        type="file"
                                        id="songFile"
                                        accept=".mp3"
                                        onChange={handleSongFileChange}
                                        className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-gray-700 hover:file:bg-green-300"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Add Song
                                </button>
                            </div>
                        </form>

                        {/* Thumbnail Section */}
                        <form onSubmit={handleThumbnailSubmit}>
                            <h2 className="text-xl font-semibold mb-4 text-green-400">Add Thumbnail</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="thumbnailFile" className="block text-sm font-medium text-gray-300">Thumbnail File</label>
                                    <input
                                        type="file"
                                        id="thumbnailFile"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-400 file:text-gray-700 hover:file:bg-green-300"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Add Thumbnail
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
