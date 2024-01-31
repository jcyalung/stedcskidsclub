import React from 'react';
import { useEffect, useState } from 'react';

import './App.css';
const curr_day = new Date();
function App() {
  const [studentID, setStudentID] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        Saint Edward Kids Club Sign In<br />
        {curr_day.toDateString()}
        <input 
            placeholder='Enter your Student ID'
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
        />
      </header>
    </div>
  );
}

export default App;
