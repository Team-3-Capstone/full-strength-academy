//a change here to make sure everything is back to normal

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [newFullName, setNewFullName] = useState('');
  const [newFeetHeight, setNewFeetHeight] = useState('');
  const [newInchesHeight, setNewInchesHeight] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('');

  const getToken = localStorage.getItem('token');
  const getUsername = localStorage.getItem('username');

  const navigate = useNavigate();

  
  
  const editUserProfile = async(event) => {
    event.preventDefault();
    
    const newTotalHeightInInches = Number((newFeetHeight * 12)) + Number(newInchesHeight);

    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${getToken}`
        },
        body: JSON.stringify({
          fullName: newFullName,
          height: newTotalHeightInInches,
          weight: newWeight,
          age: newAge,
          gender: newGender
        })
      });
      const result = await response.json();
      navigate('/profile');
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <>
      {
        getToken ?
          <section>
            <h2>Edit My Profile!</h2>
            <h3>Welcome: {getUsername}</h3>
            <form onSubmit={ editUserProfile }>
              <input 
                placeholder="full name" 
                onChange={(event) => {setNewFullName(event.target.value)}} 
                value={ newFullName } 
              />
              <input 
                placeholder="height in feet" 
                onChange={(event) => {setNewFeetHeight(event.target.value)}} 
                value={ newFeetHeight } 
              />
              <input 
                placeholder="height in inches" 
                type="number" 
                onChange={(event) => {setNewInchesHeight(event.target.value)}} 
                value={ newInchesHeight } 
              />
              <input 
                placeholder="weight in pounds" 
                type="number" 
                onChange={(event) => {setNewWeight(event.target.value)}} 
                value={ newWeight } />
              <input 
                placeholder="age" 
                type="number" 
                onChange={(event) => {setNewAge(event.target.value)}} 
                value={ newAge } />
              <input 
                placeholder="gender" 
                onChange={(event) => {setNewGender(event.target.value)}} 
                value={ newGender }/>
              <button>Update Profile</button>
            </form>
          </section>
        :
          <h2>Must Be Logged In To View This Page</h2>
    }
    </>
  )
}

export default EditProfile