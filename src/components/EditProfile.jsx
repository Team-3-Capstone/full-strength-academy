import { useState } from "react";

const EditProfile = () => {
  const [ newFullName, setNewFullName ] = useState('');
  const [ newHeight, setNewHeight ] = useState('');
  const [ newWeight, setNewWeight ] = useState('');
  const [ newAge, setNewAge ] = useState('');
  const [ newGender, setNewGender ] = useState('');

  const getToken = localStorage.getItem('token');
  const getUsername = localStorage.getItem('username');
  console.log(getToken);
  console.log(getUsername);
  
  const editUserProfile = async(event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me');
      console.log(response)

    } catch(err) {
      console.log(err);
    }
  }


  return (
    <>
      <h2>Edit My Profile!</h2>
      <form onSubmit={ editUserProfile }>
        <input placeholder="full name" onChange={(event) => {setNewFullName(event.target.value)}} />
        <input placeholder="height in inches" type="number" onChange={(event) => {setNewHeight(event.target.value)}} />
        <input placeholder="weight in pounds" type="number" onChange={(event) => {setNewWeight(event.target.value)}} />
        <input placeholder="age" type="number" onChange={(event) => {setNewAge(event.target.value)}} />
        <input placeholder="gender" onChange={(event) => {setNewGender(event.target.value)}}/>
        <button>Update Profile</button>
      </form>
    </>
  )
}

export default EditProfile