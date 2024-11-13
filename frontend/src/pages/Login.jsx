import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const { loginUser, bntLoading } = UserData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email,password,navigate);
    
    // if (!email || !password) {
    //   setError('Please enter both email and password.');
    // } else {
    //   setError('');
    //   console.log('Login attempted with:', email, password);
    //   // Here you would typically handle the login logic
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-500 to-black font-sans">
      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="Spotify Logo"
          className="w-48 mx-auto mb-8"
        />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          <button
            type="submit"
            disabled={bntLoading}
            className="w-full bg-green-500 text-white py-3 rounded-full font-bold hover:bg-green-600 transition duration-300"
          >
         {bntLoading ? "Loading..." : "Log In"}
          </button>
        </form>
        <a href="#" className="block text-center text-white mt-6 hover:underline">
          Forgot your password?
        </a>
        <Link to="/register" className="block text-center text-white mt-6 hover:underline">
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;