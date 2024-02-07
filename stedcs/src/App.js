import React from 'react';
import { useState } from 'react';
import Student from './Student';
import './App.css';
const curr_day = new Date();


function App() {
  const [response, setResponse] = useState({});
  const [studentName, setStudentName] = useState('');
  const BASE_URL = 'http://localhost:8000/';
  let previous_student = '';
  // fetch the student from the backend
  const find_student = async (student) => {
    const response_fetch = await fetch(BASE_URL + 'add-student/' + student);
    const data = await response_fetch.json();
    console.log(data);
    setResponse(data);
    console.log(response);
  }

  const saveDocument = async () => {
    const response_fetch = await fetch(BASE_URL + 'save-document');
    const data = await response_fetch.json();
    console.log(data['message']);
  }
  
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
                  find_student(studentName);
                  previous_student = studentName;
                  console.log(previous_student);
                  setStudentName('');
                }
              }}
          />
          {/* }
          <button
          onClick={() => find_student(studentName)}>
          Send
          </button> */}
        </div>
        <Student message={response} />
        <div className='Document'>
          <button
          onClick={() => saveDocument()}>
            Save Document
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
