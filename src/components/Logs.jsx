import { useState, useEffect } from 'react';
import './css-components/logs.css'

const LogsComponent = () => {
  const [mealsArray, setMealsArray] = useState([]);
  const [exercisesArray, setExercisesArray] = useState([]);
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState({
    food: '',
    exercise: '',
    setsCompleted: '',
    repsPerSet: '',
    weightUsed: '',
    duration: '',
    date: new Date().toLocaleDateString(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch Meals
  const fetchMeals = async () => {
    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/meals');
      if (!response.ok) {
        throw new Error('Failed to fetch meals.');
      }
      const data = await response.json();
      setMealsArray(data); // Update mealsArray with fetched data
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Exercises
  const fetchExercises = async () => {
    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/exercises');
      if (!response.ok) {
        throw new Error('Failed to fetch exercises.');
      }
      const data = await response.json();
      setExercisesArray(data); // Update exercisesArray with fetched data
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch Logs
  const fetchLogs = async () => {
    try {
      const response = await fetch('https://full-strength-academy.onrender.com/api/auth/me/logs', {
        method: 'GET',
        headers: {
          Authorization: `${localStorage.getItem('token')}`, // Pass the token from localStorage
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch logs. Please make sure you are logged in.');
      }

      const data = await response.json();
      setLogs(data); // Update logs with fetched data
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new log
  const handleAddLog = () => {
    setLogs((prevLogs) => [...prevLogs, newLog]); // Append the new log to logs array
    setNewLog({
      food: '',
      exercise: '',
      setsCompleted: '',
      repsPerSet: '',
      weightUsed: '',
      duration: '',
      date: new Date().toLocaleDateString(), // Set today's date
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchMeals(), fetchExercises(), fetchLogs()]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="main-logs">
    <section className="foodandexercises">
      <h1>Meal Search:</h1>
      <ul>
        {mealsArray.map((meal) => (
          <li key={meal.id}>
            {meal.name}
            <button onClick={() => setNewLog({ ...newLog, food: meal.name })}>Add</button>
          </li>
        ))}
      </ul>
  
      <h1>Exercise Search:</h1>
      <ul>
        {exercisesArray.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name}
            <button onClick={() => setNewLog({ ...newLog, exercise: exercise.name })}>Add</button>
          </li>
        ))}
      </ul>
    </section>
  
    <section className="logsandaddnewlogs">
      <h2>Log History:</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>Date:</strong> {log.date} <strong>Meal:</strong> {log.food} <strong>Exercise:</strong> {log.exercise} <strong>Sets:</strong> {log.setsCompleted} <strong>Reps:</strong> {log.repsPerSet} <strong>Weight:</strong> {log.weightUsed}lbs <strong>Duration:</strong> {log.duration} minutes
          </li>
        ))}
      </ul>
      <section className='add-new-logs'>
      <h2>Add New Log</h2>
      <div>
        <label>
          Meal:
          <input
            type="text"
            value={newLog.food}
            onChange={(e) => setNewLog({ ...newLog, food: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Exercise:
          <input
            type="text"
            value={newLog.exercise}
            onChange={(e) => setNewLog({ ...newLog, exercise: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Sets Completed:
          <input
            type="number"
            value={newLog.setsCompleted}
            onChange={(e) => setNewLog({ ...newLog, setsCompleted: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Reps per Set:
          <input
            type="number"
            value={newLog.repsPerSet}
            onChange={(e) => setNewLog({ ...newLog, repsPerSet: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Weight Used (lbs):
          <input
            type="number"
            value={newLog.weightUsed}
            onChange={(e) => setNewLog({ ...newLog, weightUsed: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          Duration (minutes):
          <input
            type="number"
            value={newLog.duration}
            onChange={(e) => setNewLog({ ...newLog, duration: e.target.value })}
          />
        </label>
      </div>
      <button onClick={handleAddLog}>Add Log</button>
      </section>
    </section>
  </main>
  
  );
};

export default LogsComponent;