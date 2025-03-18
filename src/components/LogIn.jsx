import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = ({ setToken }) => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();

  const loggingIn = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      });

      const userLogin = await response.json();
      console.log(userLogin);

      if (userLogin.message === 'Authentication error.') {
        alert('Invalid login attempt');
      } else {
        // Successfully logged in
        setToken(userLogin.token); // Set token in App.js
        localStorage.setItem('token', userLogin.token); // Save token to localStorage
        navigate('/logs'); // Navigate to the logs page
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>Log into my account!</h2>
      <form onSubmit={loggingIn}>
        <input placeholder='username' onChange={(event) => { setInputUsername(event.target.value) }} />
        <input placeholder='password' type='password' onChange={(event) => { setInputPassword(event.target.value) }} />
        <button>Login</button>
      </form>
    </>
  );
};

export default LogIn;
