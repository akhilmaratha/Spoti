import  { useState } from 'react';

const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 bg-[#282828] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
  />
);

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full py-3 px-4 bg-[#1DB954] text-white font-bold rounded-full hover:bg-[#1ED760] transition duration-300"
  >
    {children}
  </button>
);

export default function SpotifyRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', { username, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1DB954] to-[#191414]">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="Spotify Logo"
          className="w-48 mx-auto mb-8"
        />
        <form onSubmit={handleRegister} className="space-y-6">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister}>Register</Button>
        </form>
        <p className="mt-6 text-center text-[#B3B3B3]">
          Already have an account?{' '}
          <a href="/login" className="text-[#1DB954] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}