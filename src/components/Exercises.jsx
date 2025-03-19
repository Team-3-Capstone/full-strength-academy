import { useState, useEffect } from 'react';
import './css-components/exercises.css'

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [muscleGroups, setMuscleGroups] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [exerciseTypes, setExerciseTypes] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      let url = 'https://full-strength-academy.onrender.com/api/exercises'; // Initial URL to get all exercises - 'let' because the URL needs to be able to update as we change the filters to match the server routes.

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data);

        const muscles = new Set();
        const difficulties = new Set();
        const types = new Set();

        data.forEach(exercise => {
          exercise.muscle_groups.forEach(muscle => muscles.add(muscle));
          difficulties.add(exercise.difficulty);
          types.add(exercise.type);
        });

        setMuscleGroups([...muscles]);
        setDifficultyLevels([...difficulties]);
        setExerciseTypes([...types]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  // Function for what happens when we click on our filters
  const handleFilterClick = (category, value) => {
    let newSelection;
    if (category === 'muscle') {
      newSelection = selectedMuscleGroups.includes(value)
        ? selectedMuscleGroups.filter((item) => item !== value)
        : [...selectedMuscleGroups, value];
      setSelectedMuscleGroups(newSelection);
    } else if (category === 'difficulty') {
      newSelection = selectedDifficulties.includes(value)
        ? selectedDifficulties.filter((item) => item !== value)
        : [...selectedDifficulties, value];
      setSelectedDifficulties(newSelection);
    } else if (category === 'type') {
      newSelection = selectedTypes.includes(value)
        ? selectedTypes.filter((item) => item !== value)
        : [...selectedTypes, value];
      setSelectedTypes(newSelection);
    }
  };

  // Adding some Inline styling for buttons on this page only 
  const getButtonStyle = (selected) => ({
    backgroundColor: selected ? '#ff4500' : '#f0f0f0',
    borderColor: selected ? '#45a049' : '#ccc',
    color: selected ? 'white' : 'black',
    padding: '6px 20px',
    margin: '4px',
    fontSize: '10px',
    cursor: 'pointer',
    borderRadius: '3px',
    transition: 'all 0.3s ease', // I'm playing with mild CSS now that Engle has inspired me! This is the time it takes for the button to change color!
  });

  // Filter the exercises based on the selected categories
  const filteredExercises = exercises.filter((exercise) => 
    (selectedMuscleGroups.length === 0 || selectedMuscleGroups.some(group => exercise.muscle_groups.includes(group))) &&
    (selectedDifficulties.length === 0 || selectedDifficulties.includes(exercise.difficulty)) &&
    (selectedTypes.length === 0 || selectedTypes.includes(exercise.type))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className='main-exercise'>
      <h1>All Exercises</h1>
      <section>
        <h2>Filters</h2>
        <hr />
        <section>
          <h2>Muscle Group</h2>
          {muscleGroups.map((muscle, index) => (
            <button
              key={index}
              style={getButtonStyle(selectedMuscleGroups.includes(muscle))}
              onClick={() => handleFilterClick('muscle', muscle)}
            >
              {muscle.charAt(0).toUpperCase() + muscle.slice(1)} 
            </button>
          ))}
        </section>

        <section>
          <h2>Difficulty</h2>
          {difficultyLevels.map((difficulty, index) => (
            <button
              key={index}
              style={getButtonStyle(selectedDifficulties.includes(difficulty))}
              onClick={() => handleFilterClick('difficulty', difficulty)}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </section>

        <section>
          <h2>Type</h2>
          {exerciseTypes.map((type, index) => (
            <button
              key={index}
              style={getButtonStyle(selectedTypes.includes(type))}
              onClick={() => handleFilterClick('type', type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </section>

        <button onClick={() => {
          setSelectedMuscleGroups([]);
          setSelectedDifficulties([]);
          setSelectedTypes([]);
        }}>Clear Filters</button>
      </section>

      <section>
        {filteredExercises.length > 0 ? (
          <ul>
            {filteredExercises.map((exercise) => (
              <article key={exercise.id}>
                <h3>{exercise.name}</h3>
                <hr />
                <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                <p><strong>Muscle Group:</strong> {exercise.muscle_groups.join(', ')}</p>
                <p><strong>Type:</strong> {exercise.type}</p>
              </article>
            ))}
          </ul>
        ) : (
          <p>No exercises found with these filters.</p>
        )}
      </section>
    </main>
  );
};

export default Exercises;
