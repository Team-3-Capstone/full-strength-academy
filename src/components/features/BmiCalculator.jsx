import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './bmi.css';

export const Bmi = () => {
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [meal, setMeal] = useState(null);
  const [workout, setWorkoutData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const heightFeetRef = useRef(null);
  const heightInchesRef = useRef(null);
  const weightRef = useRef(null);
  const chartRef = useRef(null);

  const bmiCalculator = (heightFeet, heightInches, weight) => {
    const heightInInches = heightFeet * 12 + heightInches;
    const bmiValue = ((weight / (heightInInches * heightInInches)) * 703).toFixed(2);
    setBmi(bmiValue);
    const bmiCategory = getBMICategory(bmiValue);
    setCategory(bmiCategory);
  };

  const getBMICategory = (bmi) => {
    const categories = [
      { max: 18.5, label: 'Underweight' },
      { max: 24.9, label: 'Normal weight' },
      { max: 29.9, label: 'Overweight' },
      { max: 34.9, label: 'Obesity (Class 1)' },
      { max: 39.9, label: 'Obesity (Class 2)' },
      { max: Infinity, label: 'Obesity (Class 3 - Severe/Morbid Obesity)' }
    ];

    for (let category of categories) {
      if (bmi < category.max) return category.label;
    }
    return 'Invalid BMI';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const heightFeet = parseFloat(heightFeetRef.current.value);
    const heightInches = parseFloat(heightInchesRef.current.value);
    const weight = parseFloat(weightRef.current.value);

    if (isValidInput(heightFeet, heightInches, weight)) {
      bmiCalculator(heightFeet, heightInches, weight);
    } else {
      alert('Please enter valid numeric values for height and weight.');
    }
  };

  const isValidInput = (heightFeet, heightInches, weight) => (
    !isNaN(heightFeet) && !isNaN(heightInches) && !isNaN(weight) && heightFeet > 0 && weight > 0
  );

  useEffect(() => {
    if (bmi && category) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Underweight', 'Normal weight', 'Overweight', 'Obesity Class 1', 'Obesity Class 2', 'Obesity Class 3'],
          datasets: [{
            label: 'BMI Risk',
            data: [18.5, 24.9, 29.9, 34.9, 39.9, 40.0],
            borderColor: getColorByCategory(category),
            fill: false,
            tension: 0.5,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Risk',
              },
            },
            x: {
              title: {
                display: true,
                text: 'BMI Category',
              },
            },
          },
        },
      });

      // Make sure not to recreate the chart unless necessary
      return () => {
        chart.destroy(); // Clean up the chart when the component is unmounted or chart data changes
      };
    }
  }, [bmi, category]); // Only re-render chart when bmi or category change

  useEffect(() => {
    const categoryMealMap = {
      'Underweight': { meal: 'protein', workout: 'strength' },
      'Normal weight': { meal: 'protein', workout: 'strength' },
      'Overweight': { meal: 'lowcal', workout: 'weightloss' },
      'Obesity (Class 1)': { meal: 'lowcal', workout: 'weightloss' },
      'Obesity (Class 2)': { meal: 'lowcal', workout: 'weightloss' },
      'Obesity (Class 3 - Severe/Morbid Obesity)': { meal: 'lowcal', workout: 'weightloss' }
    };

    if (category && categoryMealMap[category]) {
      const { meal: mealGoal, workout: workoutType } = categoryMealMap[category];

      const fetchMealData = async () => {
        setLoading(true);
        try {
          const mealResponse = await fetch("https://full-strength-academy.onrender.com/api/meals");
          if (!mealResponse.ok) {
            throw new Error("Failed to fetch the meals");
          }

          const data = await mealResponse.json();
          const filteredMeals = data.filter(item => item.focus_goal === mealGoal);

          if (filteredMeals.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredMeals.length);
            const randomMeal = filteredMeals[randomIndex];
            setMeal(randomMeal);
          } else {
            throw new Error(`No meals found for focus goal: ${mealGoal}`);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      const fetchWorkoutData = async () => {
        setLoading(true);
        try {
          const workoutResponse = await fetch(`https://full-strength-academy.onrender.com/api/exercises/type/${workoutType}`);
          if (!workoutResponse.ok) {
            throw new Error("Failed to fetch the workout data");
          }

          const data = await workoutResponse.json();
          if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomWorkout = data[randomIndex];
            setWorkoutData(randomWorkout);
          } else {
            throw new Error(`No workouts found for type: ${workoutType}`);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchMealData();
      fetchWorkoutData();
    }
  }, [category]);

  const getColorByCategory = (category) => {
    const colorMap = {
      'Underweight': '#FFCC00',
      'Normal weight': '#00CC00',
      'Overweight': '#FF9933',
      'Obesity (Class 1)': '#FF6666',
      'Obesity (Class 2)': '#FF3333',
      'Obesity (Class 3 - Severe/Morbid Obesity)': '#CC0000'
    };
    return colorMap[category] || '#000000';
  };

  return (
    <main id="bmi-chart-component">
      <section>
        <div className='bmiApp'>
          <div className='formAndPlan'>
            <h2>SMART BMI CALCULATOR</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Height in feet" className='bmi-input' ref={heightFeetRef} />
              <input type="text" placeholder="Height in inches" className='bmi-input' ref={heightInchesRef} />
              <input type="text" placeholder="Weight in pounds" className='bmi-input' ref={weightRef} />
              <button type="submit" className='bmi-btn'>Calculate my BMI</button>
            </form>

            {/* Meal Recommendation */}
            {loading && <p>Loading meal recommendation...</p>}
            {error && <p>Error: {error}</p>}
            {meal && (
              <div className='mealAndWorkoutPlan'>
                <div>
                  <h3>Recommended Meal</h3>
                  <p><strong>Name:</strong> {meal.name}</p>
                  <p><strong>Focus Goal:</strong> {meal.focus_goal}</p>
                  <p><strong>Calories:</strong> {meal.calories}</p>
                  <p><strong>Submitted by:</strong> {meal.username}</p>
                </div>
                <div>
                  <h3>Workout Recommendation</h3>
                  <p><strong>Name:</strong> {workout.name}</p>
                  <p><strong>Difficulty:</strong> {workout.difficulty}</p>
                  {listMuscleGroup(workout)}
                  <p><strong>Type:</strong> {workout.type}</p>
                </div>
              </div>
            )}
          </div>
          {bmi && (
            <section id="bmi-category">
              <h3>Your BMI: {bmi}</h3>
              <h4>Category: {category}</h4>
              <canvas ref={chartRef} width="800" height="600"></canvas>
            </section>
          )}
        </div>
      </section>
    </main>
  );
};

const listMuscleGroup = (workout) => {
  return <>
    <div>
      <p><strong>Muscle groups:</strong></p>
      <ul className='muscle-group'>
        {workout.muscle_groups.map((muscle, index) => <li key={index}>{muscle}</li>)}
      </ul>
    </div>
  </>;
}

export default Bmi;
