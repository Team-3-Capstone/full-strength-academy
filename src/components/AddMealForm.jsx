import { useState, useEffect } from 'react';
import './css-components/add-meals.css'

const AddMealForm = ({ setMeals }) => {
  const [newMeal, setNewMeal] = useState({
    name: '',
    focus_goal: '',
    calories: '',
    username: localStorage.getItem('username') || '', // pre-fill username from localStorage
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [focusGoalOptions, setFocusGoalOptions] = useState([]); // State for focus goal options
  const [loading, setLoading] = useState(true);

  // retrieve focus goal options from the API
  useEffect(() => {
    const fetchFocusGoals = async () => {
      try {
        const response = await fetch('https://full-strength-academy.onrender.com/api/meals');
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();

        // get the focus goals from the fetched meal data
        const focusGoals = new Set();
        data.forEach(meal => {
          focusGoals.add(meal.focus_goal);
        });

        setFocusGoalOptions([...focusGoals]); // Set the focus goals in state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFocusGoals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal({
      ...newMeal,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!newMeal.name || !newMeal.focus_goal || !newMeal.calories) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      // API call to create a new meal
      const response = await fetch('https://full-strength-academy.onrender.com/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mealName: newMeal.name,
          mealFocus: newMeal.focus_goal,
          mealCalories: parseInt(newMeal.calories, 10), // Ensure calories are an integer
          postedByUsername: newMeal.username,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new meal');
      }

      const createdMeal = await response.json();

      // Update the meal list by calling setMeals
      setMeals((prevMeals) => [...prevMeals, createdMeal]);

      // Display success message and clear the form
      setSuccessMessage('New meal added successfully!');
      setNewMeal({
        name: '',
        focus_goal: '',
        calories: '',
        username: localStorage.getItem('username') || '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading focus goal options...</p>;
  }

  return (
    <section className='add-meals'>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
      <h1>Add New Meal</h1>
        <label>
          Meal Name:
          <input
            type="text"
            name="name"
            value={newMeal.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Focus Goal:
          <select
            name="focus_goal"
            value={newMeal.focus_goal}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Focus Goal</option>
            {focusGoalOptions.map((goal, index) => (
              <option key={index} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Calories:
          <input
            type="number"
            name="calories"
            value={newMeal.calories}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        <label>
          Posted By:
          <input
            type="text"
            name="username"
            value={newMeal.username}
            readOnly
            disabled
          />
        </label>
        <br />

        <button type="submit">Add Meal</button>
      </form>
    </section>
  );
};

export default AddMealForm;
