import { useState } from "react";

const Register = () => {
  const [ newUsername, setNewUsername ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');

  const addNewUser = (event) => {
    event.preventDefault(); 

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