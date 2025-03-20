import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import roundLogo from './img/round-logo.ico';

const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('username');
    setToken(''); // Clear the token state in App.js
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="navbar">
      <Link to="/"><div className="brand">FULL STRENGTH ACADEMY</div></Link>
      <nav>
        <ul className="nav-links">
          {/* Home link is always visible */}
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Show Log In and Register links when NOT logged in */}
          {!token ? (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            // Show other links and Log Out button when logged in
            <>
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
                <Link to="/logs">My Logs</Link>
              </li>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <button
                  onClick={signOut}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'blue',
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
