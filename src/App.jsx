import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import EditProfile from './components/EditProfile.jsx';
import Exercises from './components/Exercises.jsx';
import LogIn from './components/LogIn.jsx';
import Logs from './components/Logs.jsx';
import Meals from './components/Meals.jsx';
import AddMealForm from './components/AddMealForm.jsx';
import Profile from './components/Profile.jsx';
import Register from './components/Register.jsx';
import NavBar from './components/NavBar.jsx';
import BmiCalculaltor from './components/features/BmiCalculator';
import LearnMore from './components/LearnMore.jsx';

const App = () => {
  const [meals, setMeals] = useState([]); // Meal state to pass down to AddMealForm
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editprofile" element={<EditProfile token={localStorage.getItem('token')} />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/login" element={<LogIn setToken={setToken} />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/meals" element={<Meals meals={meals} setMeals={setMeals} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/bmi" element={<BmiCalculaltor />} />
        <Route path="/add-meal" element={<AddMealForm setMeals={setMeals} />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Routes>
    </>
  );
};

export default App;
