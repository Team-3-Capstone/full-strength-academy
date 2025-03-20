import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './css-components/meals.css';

const Meals = ({ meals, setMeals }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMealFocus, setSelectedMealFocus] = useState([]);
  const [selectedCalories, setSelectedCalories] = useState([]);
  const [mealFocusOptions, setMealFocusOptions] = useState([]);
  const [calorieRanges, setCalorieRanges] = useState([100, 200, 300, 400, 500]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://full-strength-academy.onrender.com/api/meals');
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        const data = await response.json();
        setMeals(data);

        const focusGoals = new Set();
        data.forEach(meal => {
          focusGoals.add(meal.focus_goal);
        });

        setMealFocusOptions([...focusGoals]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [setMeals]);

  // Handle filter button clicks
  const handleFilterClick = (category, value) => {
    let newSelection;
    if (category === 'focus') {
      newSelection = selectedMealFocus.includes(value)
        ? selectedMealFocus.filter(item => item !== value)
        : [...selectedMealFocus, value];
      setSelectedMealFocus(newSelection);
    } else if (category === 'calories') {
      newSelection = selectedCalories.includes(value)
        ? selectedCalories.filter(item => item !== value)
        : [...selectedCalories, value];
      setSelectedCalories(newSelection);
    }
  };

  // Filter the meals based on selected categories
  const filteredMeals = meals.filter((meal) =>
    (selectedMealFocus.length === 0 || selectedMealFocus.includes(meal.focus_goal)) &&
    (selectedCalories.length === 0 || selectedCalories.some(calorie => meal.calories <= calorie))
  );

  // Button style inline for the selections
  const getButtonStyle = (selected) => ({
    backgroundColor: selected ?' #ff4500' : '#f0f0f0',
    borderColor: selected ? '#45a049' : '#ccc',
    color: selected ? 'white' : 'black',
    padding: '8px 16px',
    margin: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
        <center><h2>All Meals</h2></center>  
    <main className='main-meals'>
      

      

      {/* Add "Add New Meal" button at the top */}  

      <section>
        <h4>Filters</h4>
        <hr />
        <section>
          <h4>Meal Focus</h4>
          {mealFocusOptions.map((focus, index) => (
            <button
              key={index}
              style={getButtonStyle(selectedMealFocus.includes(focus))}
              onClick={() => handleFilterClick('focus', focus)}
            >
              {focus.charAt(0).toUpperCase() + focus.slice(1)}
            </button>
          ))}
        </section>

        <section>
          <h4>Calories</h4>
          {calorieRanges.map((calorie, index) => (
            <button
              key={index}
              style={getButtonStyle(selectedCalories.includes(calorie))}
              onClick={() => handleFilterClick('calories', calorie)}
            >
              {'>'}{calorie} Cal
            </button>
          ))}
        </section>
  <section>
       
      </section>
        <button onClick={() => {
          setSelectedMealFocus([]);
          setSelectedCalories([]);
        }}>Clear Filters</button>
        <br />

          <Link to="/add-meal">
          <button style={{ padding: '10px 30px', fontSize: '16px', backgroundColor: '#ff4500', color: 'white', borderRadius: '5px', border: 'none' }}>
            Add New Meal
          </button>
        </Link>
      </section>

      <section>
        {filteredMeals.length > 0 ? (
          <ul>
            {filteredMeals.map((meal) => (
              <article key={meal.id}>
                <h3>{meal.name}</h3>
                <p><strong>Focus Goal:</strong> {meal.focus_goal}</p>
                <p><strong>Calories:</strong> {meal.calories}</p>
                <p><strong>Posted By:</strong> {meal.username}</p>
              </article>
            ))}
          </ul>
        ) : (
          <p>No meals found with these filters.</p>
        )}
      </section>
    </main>
    </>
  );
};

export default Meals;
