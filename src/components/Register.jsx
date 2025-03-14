import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [ newUsername, setNewUsername ] = useState('');
  const [ newPassword1, setNewPassword1 ] = useState('');
  const [ newPassword2, setNewPassword2 ] = useState('');
  const [ newToken, setNewToken ] = useState('');

  const navigate = useNavigate();

  const addNewUser = async(event) => {
    if (newPassword1 === newPassword2) {
      event.preventDefault(); 

      try {
        const response = await fetch('https://full-strength-academy.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            username: newUsername,
            password: newPassword1,
            fullName: '',
            height: 0,
            weight: 0,
            age: 0,
            gender: ''
          })
        });
        const newUser = await response.json();
        console.log(newUser);
        if (!newUser) {
          alert('Invalid Registration');
        } else {
          setNewToken(newUser.token);
          localStorage.setItem('token', newUser.token);
          localStorage.setItem('username', newUser.username);
          navigate('/editprofile')
        }
      } catch(err) {
        console.log(err);
      }
    } else {
      alert('Passwords must match');
    }
  }

  return (
    <>
      <h2>Register for an account!</h2>
      <form onSubmit={ addNewUser }>
        <input placeholder="username" onChange={(event) => {setNewUsername(event.target.value)}} />
        <input placeholder="enter password" type="password" onChange={(event) => {setNewPassword1(event.target.value)}} />
        <input placeholder="verify password" type="password" onChange={(event) => {setNewPassword2(event.target.value)}} />
        <button>Create Account</button>
      </form>
    </>
  )
}

export default Register