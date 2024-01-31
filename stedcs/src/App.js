import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import Student from './Student';
import './App.css';
const curr_day = new Date();
function App() {
  const [studentID, setStudentID] = useState('');
  // return value for react
  return (
    <div className="App">
      {/* header for the sign in */}
      <header className="App-header">
        Saint Edward Kids Club Sign In<br />

        {/* display the current date */}
        {curr_day.toDateString()}


        {/* input for the student ID */}
        <input 
            // values to display
            placeholder='Enter your Student ID'
            value={ studentID }
            
            // update the student ID on number press
            onChange={(e) => {
              const re = /^[0-9\b]+$/;
              if((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 6) {
                setStudentID(e.target.value);
              }
              else {
                console.log('Please enter a valid Student ID');
              }
              }}
            
            // when enter key is pressed, check if the student ID is valid
            // otherwise, save studentID and send to backend
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                console.log('Enter key pressed');
                if(studentID.length !== 6) {
                  console.log('Please enter a valid Student ID');
                }
                else {
                  console.log('Student ID = ' + studentID);
                }
              }
            }}
        />
        <div className="Student">
          <Student studentID={studentID} />
        </div>
      </header>
    </div>
  );
}

export default App;
