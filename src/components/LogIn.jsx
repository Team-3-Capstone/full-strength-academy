import { useState } from "react"

const LogIn = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ token, setToken ] = useState('');

  const loggingIn = async(event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const userLogin = response.json();
      console.log(userLogin);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>Log into my account!</h2>
      <form onSubmit={ loggingIn }>
        <input placeholder='username' onChange={(event) => {setUsername(event.target.value)}} />
        <input placeholder='password' type='password' onChange={(event) => {setPassword(event.target.value)}} />
        <button>Login</button>
      </form>
    </>
  )
}

export default LogIn