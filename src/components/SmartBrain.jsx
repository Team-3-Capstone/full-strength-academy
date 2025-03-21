import { useState } from 'react';
import './css-components/smartbrain.css';
import memoryImage from './img/memoryTraining.png'; // Corrected image import

const MemoryTestComponent = () => {
  const [numbers, setNumbers] = useState([]);
  const [level, setLevel] = useState('');
  const [showNumbers, setShowNumbers] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');

  const generateRandomNumbers = (level) => {
    let numberOfNumbers;
    switch (level) {
      case 'easy':
        numberOfNumbers = 1;
        break; 
      case 'medium':
        numberOfNumbers = 2;
        break;
      case 'normal':
        numberOfNumbers = 3;
        break;
      case 'hard':
        numberOfNumbers = Math.floor(Math.random() * 2) + 4; 
        break;
      case 'brilliant':
        numberOfNumbers = Math.floor(Math.random() * 3) + 5;
        break;
      default:
        console.log("Invalid level selected. Choose from: easy, medium, hard, brilliant.");
        return [];
    }
    const randomNumbers = [];
    for (let i = 0; i < numberOfNumbers; i++) {
      randomNumbers.push(Math.floor(Math.random() * 5000));
    }
    return randomNumbers;
  };

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
    const randomNumbers = generateRandomNumbers(selectedLevel);
    setNumbers(randomNumbers);
    setShowNumbers(true);
    setResult('');
    setUserInput('');

    setTimeout(() => {
      setShowNumbers(false);
    }, 5000); 
  };

  const formatInputWithDashes = (input) => {
    const cleanInput = input.replace(/[^0-9]/g, '');
    const formattedInput = cleanInput.match(/.{1,4}/g)?.join('-') || cleanInput;
    return formattedInput;
  };

  const handleInputChange = (e) => {
    const formattedInput = formatInputWithDashes(e.target.value);
    setUserInput(formattedInput);
  };
  
  const handleSubmit = () => {
    const userNumbers = userInput.split('-').map(Number);
    if (JSON.stringify(userNumbers) === JSON.stringify(numbers)) {
      setResult('Correct!');
    } else {
      setResult('Incorrect, try again!');
    }
  };

  return (
    <div className="container">
      <h1>Smart Brain Training </h1>
      <img src={memoryImage} alt="Memory Training" /> {/* Corrected image element */}
      <h2>Memory</h2>
      <p><i>Try to remember the numbers</i></p>
      <div className="level-buttons">
        <button onClick={() => handleLevelSelect('easy')}>Easy</button>
        <button onClick={() => handleLevelSelect('medium')}>Medium</button>
        <button onClick={() => handleLevelSelect('normal')}>Normal</button>
        <button onClick={() => handleLevelSelect('hard')}>Hard</button>
        <button onClick={() => handleLevelSelect('brilliant')}>Brilliant</button>
      </div>
      <div className="sequence-container">
        {showNumbers && numbers.map((num, index) => (
          <div key={index} className="sequence-item">
            {num}
          </div>
        ))}
      </div>
      {!showNumbers && (
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter numbers separated by - (e.g. 1292 - 293)"
            value={userInput}
            onChange={handleInputChange}
          />
          <button className='memory-submit-btn' onClick={handleSubmit}>Submit</button>
        </div>
      )}
      {result && <h3 className="result-message">{result}</h3>}
    </div>
  );
};

export default MemoryTestComponent;
