import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [ newUsername, setNewUsername ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');

  const navigate = useNavigate();

  const addNewUser = async(event) => {
    event.preventDefault(); 

    try {
      const response = await fetch();
    } catch(err) {
      console.log(err);
    }

    navigate('/editprofile');
  }

  return (
    <>
      <h2>Register for an account!</h2>
      <form onSubmit={ addNewUser }>
        <input placeholder="username" onChange={(event) => {setNewUsername(event.target.value)}} />
        <input placeholder="password" onChange={(event) => {setNewPassword(event.target.value)}} />
        <button>Create Account</button>
      </form>
    </>
  )
}

export default Register