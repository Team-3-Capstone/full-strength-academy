import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const Profile = () => {
  const token = localStorage.getItem('token');
  const [userStats, setUserStats] = useState({});
  const [lastLog, setLastLog] = useState({});
  // const [exerciseById, setExerciseById] = useState({});
  // const [mealById, setMealById] = useState({});
  // const {exerciseId} = useParams();
  // const {mealId} = useParams();

  const fullName = userStats.fullName;
  const firstName = fullName?.split(' ')[0];
  const heightInInches = userStats.height;
  const height = `${Math.floor(heightInInches/12)}' ${heightInInches%12}"`;
  const weight = userStats.weight;
  const age = userStats.age;
  const gender = userStats.gender;

  const lastExerciseId = lastLog.exercise_id;
  const lastMealId = lastLog.meal_id;
  const lastExerciseRepsPerSet = lastLog.reps_per_set;
  const lastExerciseSetsCompleted = lastLog.sets_completed;
  const lastWeightUsed = lastLog.weight_used;
  const lastExerciseDurationMinutes = lastLog.duration_minutes;

  const lastLogDate = lastLog.date;
  const dateArr = lastLogDate?.split('-');
  let year = '';
  let month = '';
  let day = '';

  if(dateArr) {
    year = dateArr[0];
    month = dateArr[1];
    day = dateArr[2].slice(0,2);
  }

  useEffect(() => {
    const getStats = async() => {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me', {
        headers: {
          "Authorization": `${token}`
        }
      });
      const retrievedStats = await response.json();
      setUserStats(retrievedStats);
    }
    getStats();
  }, []);

  useEffect(() => {
    const getLastLog = async() => {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me/logs', {
        headers: {
          "Authorization": `${token}`
        }
      });
      const allLogs = await response.json();
      setLastLog(allLogs[0]);
    }
    getLastLog();
  }, []);

  // useEffect(() => {
  //   const getExerciseById = async() => {
  //     const response = await fetch(`https://full-strength-academy.onrender.com/api/exercises/id/${lastExerciseId}`);
  //     const selectedExerciseObj = await response.json();
  //     setExerciseById(selectedExerciseObj.name);
  //   }
  //   getExerciseById();
  // }, []);

  // useEffect(() => {
  //   const getMealById = async() => {
  //     const response = await fetch(`https://full-strength-academy.onrender.com/api/exercises/id/${mealId}`);
  //     const selectedMealObj = await response.json();
  //     setMealById(selectedMealObj.name);
  //   }
  //   getMealById();
  // }, []);
  
  return (
    <>
      { 
        token ?
            <>
              <header>
                <h2>Let's Get Better Today, {firstName}!</h2>
              </header>

              <section>
                <h3>{fullName}</h3>
                <p>Height: {height}</p>
                <p>Weight: {weight} lbs</p>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
                <button>
                  <Link to='/editprofile'>Edit My Info</Link>
                </button>
              </section>
             
              <section>
                <h3>Last Log Entry: {month}/{day}/{year}</h3>
                <p>{lastMealId}</p>
                <p>{lastExerciseId}</p>
                <p>Reps Per Set: {lastExerciseRepsPerSet}</p>
                <p>Sets: {lastExerciseSetsCompleted}</p>
                <p>Duration: {lastExerciseDurationMinutes} minutes</p>
                <p>Weight Used: {lastWeightUsed}</p>
                <button>
                  <Link to='/logs'>Create a New Log</Link>
                </button>
              </section>
              
              <section>
                <button>
                  <Link to='/addmealform'>Share a New Recipe with the Community</Link>
                </button>
              </section>
          </>
        :
          <section><h2>Create an account to access this feature.</h2></section>
      }
          {/* Progress Bar (weight loss goals), calorie counter?, strength-based progress bar?*/}
          {/* BMI graph only on page? */}
          {/* Water consumption feature, sleep log? -- resets every day at 11:59 pm */}
          {/* Links to custom workout and meal plans -- have a reset every Saturday at 11:59 pm. Once a workout or meal has been eaten that week */}
    </>
  )
}

export default Profile