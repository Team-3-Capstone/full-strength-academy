import { useState } from "react";

const EditProfile = () => {
  const [ newFullName, setNewFullName ] = useState('');
  const [ newHeight, setNewHeight ] = useState('');
  const [ newWeight, setNewWeight ] = useState('');
  const [ newAge, setNewAge ] = useState('');
  const [ newGender, setNewGender ] = useState('');

  const getToken = localStorage.getItem('token');
  const getUsername = localStorage.getItem('username');
  
  const editUserProfile = async(event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${getToken}`
        },
        body: JSON.stringify({
          fullName: newFullName,
          height: newHeight,
          weight: newWeight,
          age: newAge,
          gender: newGender
        })
      });
      const result = await response.json();
      console.log(result);

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
              <input placeholder="full name" onChange={(event) => {setNewFullName(event.target.value)}} />
              <input placeholder="height in inches" type="number" onChange={(event) => {setNewHeight(event.target.value)}} />
              <input placeholder="weight in pounds" type="number" onChange={(event) => {setNewWeight(event.target.value)}} />
              <input placeholder="age" type="number" onChange={(event) => {setNewAge(event.target.value)}} />
              <input placeholder="gender" onChange={(event) => {setNewGender(event.target.value)}}/>
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