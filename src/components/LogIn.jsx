import { useState } from "react"
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [ inputUsername, setInputUsername ] = useState('');
  const [ inputPassword, setInputPassword ] = useState('');
  const [ token, setToken ] = useState('');

  const navigate = useNavigate();

  const loggingIn = async(event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword
        })
      });
      const userLogin = await response.json();
      console.log(userLogin);
      if(userLogin.token === 'undefined') {
        alert('You did something silly like left your caps lock on or Joe and Brianna reseeded the server')
      } else {
        setToken(userLogin.token);
        localStorage.setItem('token', userLogin.token);
        localStorage.setItem('username', userLogin.username);
        navigate('/logs');
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>Log into my account!</h2>
      <form onSubmit={ loggingIn }>
        <input placeholder='username' onChange={(event) => {setInputUsername(event.target.value)}} />
        <input placeholder='password' type='password' onChange={(event) => {setInputPassword(event.target.value)}} />
        <button>Login</button>
      </form>
    </>
  )
}

export default LogIn