import React from 'react';
import { useState } from 'react';
import Student from './Student';
import './App.css';
const curr_day = new Date();


function App() {
  const [response, setResponse] = useState({})
  const [studentName, setStudentName] = useState('');
  const BASE_URL = 'http://localhost:8000/student/';

  const find_student = async (student) => {
    const response = await fetch(BASE_URL + student);
    const data = await response.json();
    setResponse(data);
  }
  
  // return value for react
  return (
    <div className="App">
      {/* header for the sign in */}
      <header className="App-header">
        Saint Edward Kids Club Sign In<br />

        {/* display the current date */}
        {curr_day.toDateString()}


        {/* input for the student ID */}
        <div className='search'>
          <input 
              // values to display
              placeholder='Enter your Student ID'
              value={ studentName }

              // update the student ID on number press
              onChange={(e) => {
                  setStudentName(e.target.value);
                }}
              
              // when enter key is pressed, check if the student ID is valid
              // otherwise, save studentName and send to backend
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  console.log(studentName);
                  find_student(studentName);
                  console.log(response);
                }
              }}
          />
          <button
          onClick={() => find_student(studentName)}>
          Send
          </button> 
        </div>
        
        
        {
          studentName !== '' && response['name'] === 'Student found' ?
          (
            <Student studentName={studentName} message={response} />
          )
          :
          (
            <div className='notFound'></div>
          )
        }
      </header>
    </div>
  );
}

export default App;
