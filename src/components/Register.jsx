import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state to show loading message

  const navigate = useNavigate();

  const addNewUser = async (event) => {
    event.preventDefault();

    if (!newUsername || !newPassword1 || !newPassword2) {
      alert("Please fill out all fields.");
      return;
    }

    if (newPassword1 !== newPassword2) {
      setPasswordMatchError('Passwords must match');
      return;
    }

    // Set loading to true when the request starts
    setLoading(true);

    try {
  
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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

      if (newUser && newUser.token) {
        // Set the token in the parent component (App.js) to update the navbar
        setToken(newUser.token);

        // Save the token and username to localStorage 
        localStorage.setItem('token', newUser.token);
        localStorage.setItem('username', newUser.username);

        // Navigate to the 'edit profile' page
        navigate('/editprofile');
      } else {
        alert('Invalid Registration');
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while registering. Please try again.");
    } finally {
      // Set loading to false after the request completes
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Register for an account!</h2>
      <form onSubmit={addNewUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(event) => { setNewUsername(event.target.value) }}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={newPassword1}
          onChange={(event) => { setNewPassword1(event.target.value) }}
        />
        <input
          type="password"
          placeholder="Verify password"
          value={newPassword2}
          onChange={(event) => { setNewPassword2(event.target.value) }}
        />
        <button type="submit" disabled={loading}>Create Account</button>
        
        {/* Display password match error */}
        {passwordMatchError && <p>{passwordMatchError}</p>}
        
        {/* Display loading message */}
        {loading && <p>Loading...</p>}
      </form>
    </>
  );
};

export default Register;
