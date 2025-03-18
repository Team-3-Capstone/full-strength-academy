import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const token = localStorage.getItem('token');
  const [userStats, setUserStats] = useState({});
  const [lastLog, setLastLog] = useState(null);

  const fullName = userStats.fullName;
  const firstName = fullName?.split(' ')[0];
  const heightInInches = userStats.height;
  const height = `${Math.floor(heightInInches/12)}' ${heightInInches%12}"`;
  const weight = userStats.weight;
  const age = userStats.age;
  const gender = userStats.gender;

  let lastExerciseId = '';
  let lastMealId = '';
  let lastExerciseRepsPerSet= '';
  let lastExerciseSetsCompleted = '';
  let lastWeightUsed = '';
  let lastExerciseDurationMinutes = '';
  let lastLogYear = '';
  let lastLogMonth = '';
  let lastLogDay = '';

  if(lastLog) {
    lastExerciseId = lastLog.exercise_id;
    lastMealId = lastLog.meal_id;
    lastExerciseRepsPerSet = lastLog.reps_per_set;
    lastExerciseSetsCompleted = lastLog.sets_completed;
    lastWeightUsed = lastLog.weight_used;
    lastExerciseDurationMinutes = lastLog.duration_minutes;

    const lastLogDate = lastLog.date;
    const dateArr = lastLogDate?.split('-');

    if(dateArr) {
      lastLogYear = dateArr[0];
      lastLogMonth = dateArr[1];
      lastLogDay = dateArr[2].slice(0,2);
    }
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
  
  return (
    <> {
      token && lastLog ?
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
          <h3>Last Log Entry: {lastLogMonth}/{lastLogDay}/{lastLogYear}</h3>
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
            <Link to='/add-meal'>Share a New Recipe with the Community</Link>
          </button>
        </section>
  
      </> : null}

      {token && !lastLog ? 
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
          <button>
            <Link to='/logs'>Create Your First Log</Link>
          </button>
          <button>
            <Link to='/add-meal'>Share a New Recipe with the Community</Link>
          </button>
        </section>
      </> : null}

      { !token ? <><section><h2>Create an account to access this feature.</h2></section></> : null } 
      </> ) }


export default Profile