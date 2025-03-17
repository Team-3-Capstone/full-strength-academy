import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import EditProfile from './components/EditProfile.jsx';
import Exercises from './components/Exercises.jsx';
import LogIn from './components/LogIn.jsx';
import Logs from './components/Logs.jsx';
import Meals from './components/Meals.jsx';
import Profile from './components/Profile.jsx';
import Register from './components/Register.jsx';
import NavBar from './components/NavBar.jsx';
import BmiCalculaltor from './components/features/BmiCalculator';

const App = () => {
  // Get token from localStorage, use empty string if token not available
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Update our localStorage whenever the token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
    } else {
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  }, [token]);

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/login" element={<LogIn setToken={setToken} />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bmi" element={<BmiCalculaltor />} />
      </Routes>
    </>
  );
};

export default App;
