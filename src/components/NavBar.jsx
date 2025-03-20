import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/">
        <div className="brand">Full Strength Academy</div>
      </Link>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>|

          { !token ? (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>|
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/bmi">Check My BMI</Link>
              </li>|
              <li>
                <Link to="/meals">Meals</Link>
              </li>|
              <li>
                <Link to="/exercises">Exercises</Link>
              </li>|
              <li>
                <Link to="/logs">My Logs</Link>
              </li>|
              <li>
                <Link to="/profile">My Profile</Link>
              </li>|
              <li>
                <Link onClick={signOut}>Sign Out</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar;