import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utilities/userSlice';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change for different fields
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Form data submitted:', isLogin ? email : `${name} ${email}`);

    const url = isLogin ? `http://localhost:3000/login/${email}/${password}` : `http://localhost:3000/signup/${name}/${email}/${password}`;

    if (isLogin ? email && password : name && email) {
      try{
      const response = await fetch(url);
      if (response.ok) {
        console.log(response);
        response.json().then((data) => {
          dispatch(addUser({ token: data.token, userInfo: data.user }));
          localStorage.setItem('token', data.token);
          console.log(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate("/main");
        });
      } else {
        console.error(isLogin ? "Failed to log in" : "Failed to sign up");
      }
    }catch(error){
      console.log(error);
    }
    }
  };

  // Toggle between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{isLogin ? 'Log In' : 'Sign Up'}</h2>

        {!isLogin && (
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleNameChange}
            />
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleEmailChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </p>
          <button
            type="button"
            onClick={toggleForm}
            className="text-indigo-600 hover:underline mt-2"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
