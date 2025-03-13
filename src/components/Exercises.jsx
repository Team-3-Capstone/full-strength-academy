import { useState, useEffect } from 'react';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      let url = 'https://full-strength-academy.onrender.com/api/exercises';  // set initial URL to get all the exercises

      // create filters to apply if selected
      if (selectedMuscleGroup) {
        url += `/muscle/${selectedMuscleGroup}`;
      }
      if (selectedDifficulty) {
        url += `/difficulty/${selectedDifficulty}`;
      }
      if (selectedType) { 
        url += `/type/${selectedType}`;
      }

      try {
        const response = await fetch(url); //
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises(); 

  }, [selectedMuscleGroup, selectedDifficulty, selectedType]);  // Re-fetch when filters change

  // Create a function to clear all filters
  const clearFilters = () => {
    setSelectedMuscleGroup('');
    setSelectedDifficulty('');
    setSelectedType('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2>All Exercises</h2>

      <>
        <label>
          Muscle Group:
          <select onChange={(e) => setSelectedMuscleGroup(e.target.value)} value={selectedMuscleGroup}>
            <option value="">All</option>
            <option value="arms">Arms</option>
            <option value="legs">Legs</option>
            <option value="back">Back</option>
            <option value="chest">Chest</option>
          </select>
        </label>

        <label>
          Difficulty:
          <select onChange={(e) => setSelectedDifficulty(e.target.value)} value={selectedDifficulty}>
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Type:
          <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
            <option value="">All</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="weightloss">Weight Loss</option>
          </select>
        </label>
        
        <button onClick={clearFilters}>Clear Filters</button>
      </>

    
      {exercises.length > 0 ? (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              <h3>{exercise.name}</h3>
              <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
              <p><strong>Muscle Group:</strong> {exercise.muscle_group}</p>
              <p><strong>Type:</strong> {exercise.type}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises found.</p>
      )}
    </>
  );
};

export default Exercises;
