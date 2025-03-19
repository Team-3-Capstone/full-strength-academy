import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [newFullName, setNewFullName] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get token and username from localStorage
  const getToken = localStorage.getItem('token');
  const getUsername = localStorage.getItem('username');

  // Redirect to login page if there's no token
  useEffect(() => {
    if (!getToken) {
      navigate('/login');
    }
  }, [getToken, navigate]); // runs whenever getToken changes because its dependent on it

  const editUserProfile = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Reset error message on each attempt

    // Ensure that the token is present
    if (!getToken) {
      setError("You must be logged in to edit your profile.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken}`,
        },
        body: JSON.stringify({
          fullName: newFullName,
          height: newHeight,
          weight: newWeight,
          age: newAge,
          gender: newGender,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to profile page after successful update
        navigate('/profile');
      } else {
        setError(result.message || 'Failed to update profile. Please try again.');
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('An error occurred while updating your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Edit My Profile!</h2>
      <h3>Welcome: {getUsername}</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={editUserProfile}>
        <input
          placeholder="Full Name"
          onChange={(event) => { setNewFullName(event.target.value); }}
          value={newFullName}
        />
        <input
          placeholder="Height (in inches)"
          type="number"
          onChange={(event) => { setNewHeight(event.target.value); }}
          value={newHeight}
        />
        <input
          placeholder="Weight (in pounds)"
          type="number"
          onChange={(event) => { setNewWeight(event.target.value); }}
          value={newWeight}
        />
        <input
          placeholder="Age"
          type="number"
          onChange={(event) => { setNewAge(event.target.value); }}
          value={newAge}
        />
        <input
          placeholder="Gender"
          onChange={(event) => { setNewGender(event.target.value); }}
          value={newGender}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </section>
  );
};

export default EditProfile;





/////// Old code if everything fails:

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const EditProfile = () => {
//   const [newFullName, setNewFullName] = useState('');
//   const [newFeetHeight, setNewFeetHeight] = useState('');
//   const [newInchesHeight, setNewInchesHeight] = useState('');
//   const [newWeight, setNewWeight] = useState('');
//   const [newAge, setNewAge] = useState('');
//   const [newGender, setNewGender] = useState('');

//   const getToken = localStorage.getItem('token');
//   const getUsername = localStorage.getItem('username');

//   const navigate = useNavigate();

  
  
//   const editUserProfile = async(event) => {
//     event.preventDefault();
    
//     const newTotalHeightInInches = Number((newFeetHeight * 12)) + Number(newInchesHeight);

//     try {
//       const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `${getToken}`
//         },
//         body: JSON.stringify({
//           fullName: newFullName,
//           height: newTotalHeightInInches,
//           weight: newWeight,
//           age: newAge,
//           gender: newGender
//         })
//       });
//       const result = await response.json();
//       navigate('/profile');
//     } catch(err) {
//       console.log(err);
//     }
//   }


//   return (
//     <>
//       {
//         getToken ?
//           <section>
//             <h2>Edit My Profile!</h2>
//             <h3>Welcome: {getUsername}</h3>
//             <form onSubmit={ editUserProfile }>
//               <input 
//                 placeholder="full name" 
//                 onChange={(event) => {setNewFullName(event.target.value)}} 
//                 value={ newFullName } 
//               />
//               <input 
//                 placeholder="height in feet" 
//                 onChange={(event) => {setNewFeetHeight(event.target.value)}} 
//                 value={ newFeetHeight } 
//               />
//               <input 
//                 placeholder="height in inches" 
//                 type="number" 
//                 onChange={(event) => {setNewInchesHeight(event.target.value)}} 
//                 value={ newInchesHeight } 
//               />
//               <input 
//                 placeholder="weight in pounds" 
//                 type="number" 
//                 onChange={(event) => {setNewWeight(event.target.value)}} 
//                 value={ newWeight } />
//               <input 
//                 placeholder="age" 
//                 type="number" 
//                 onChange={(event) => {setNewAge(event.target.value)}} 
//                 value={ newAge } />
//               <input 
//                 placeholder="gender" 
//                 onChange={(event) => {setNewGender(event.target.value)}} 
//                 value={ newGender }/>
//               <button>Update Profile</button>
//             </form>
//           </section>
//         :
//           <h2>Must Be Logged In To View This Page</h2>
//     }
//     </>
//   )
// }

// export default EditProfile