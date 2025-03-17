import { useState } from 'react';

const Profile = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  console.log(token);

  const getStats = async() => {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me', {
        Headers: {
          "Authorization": `${token}`
        }
      });
      const x = await response.json();
      console.log(x);
  }
  getStats();
  

  return (
    <>
      { 
        token ?
          <section>
            <h2>Let's Get Better Today, {`${username}`}!</h2>
          </section>
        :
          <section><h2>Create an account to access this feature.</h2></section>
      }

          {/* get full name and split to just first name for this above */}
          {/* Progress Bar (weight loss goals), calorie counter?, strength-based progress bar?*/}
          {/* BMI graph only on page? */}
          {/* Water consumption feature, sleep log? -- resets every day at 11:59 pm */}
          {/* Links to custom workout and meal plans -- have a reset every Saturday at 11:59 pm. Once a workout or meal has been eaten that week */}
          {/* Link to create new meals for the community */}
          {/* Edit profile link - navbar? */}
    </>
  )
}

export default Profile