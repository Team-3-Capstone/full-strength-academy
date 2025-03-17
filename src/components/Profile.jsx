

const Profile = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  return (
    <>
      <h2>Let's Get Better Today, {`${username}`}!</h2>
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