import React from 'react';
import { useState } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Student from './Student';
import './App.css';
const curr_day = new Date();


function App() {
  const [response, setResponse] = useState({});
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([{}]);
  const BASE_URL = 'http://localhost:8000/';
  // fetch the student from the backend
  const find_student = async (student) => {
    const response_fetch = await fetch(BASE_URL + 'add-student/' + student);
    const data = await response_fetch.json();
    setResponse(data);
    console.log(response);
  }
  const saveDocument = async () => {
    const response_fetch = await fetch(BASE_URL + 'save-document');
    const data = await response_fetch.json();
    console.log(data['message']);
  }
  const getStudents = async () => {
    const response_fetch = await fetch(BASE_URL + 'get-students');
    const data = await response_fetch.json();
    setStudents(data);
    console.log(students);
  }   
  
  const handleOnSearch = (string, results) => {
   console.log(string, results);
  };

  const handleOnHover = (result) => {
  //  console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
  //  console.log("Cleared");
  };

  const formatResult = (item) => {
    console.log(item);
    return (
      <div className="result-wrapper">
        <span className="result-span">id: {item.id}</span>
        <span className="result-span">name: {item.name}</span>
      </div>
    );
  };
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
          <button
          onClick={() => getStudents()}>
            Get Students
          </button>
          <ReactSearchAutocomplete
            items={students}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            styling={{ zIndex: 4 }} // To display it on top of the search box below
            autoFocus
          />
        </div>
        
      </header>
    </div>
  );
}

export default App;
