import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <header className="navbar">
        <div className="brand">FULL STRENGTH ACADEMY</div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bmi">Bmi App</Link> 
            </li>
            <li>
              <Link to="/meals">Meals</Link>
            </li>
            <li>
              <Link to="/exercises">Exercises</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link> 
            </li>
            <li>
              <Link to="/Register">Register</Link> 
            </li>
        
          </ul>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
