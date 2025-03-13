import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import EditProfile from './components/EditProfile.jsx';
import Exercises from './components/Exercises.jsx';
import LogIn from './components/LogIn.jsx';
import Logs from './components/Logs.jsx';
import Meals from './components/Meals.jsx'
import Profile from './components/Profile.jsx';
import Register from './components/Register.jsx'


const App = () => {

  return (
    <> 
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/editprofile" element={<EditProfile/>} />
        <Route path="/exercises" element={<Exercises/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/logs" element={<Logs/>} />
        <Route path="/meals" element={<Meals/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
   
    
    </>
  )
}

export default App

