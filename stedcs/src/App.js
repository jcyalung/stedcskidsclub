import React from 'react';
import { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Student from './Student';
import './App.css';
const curr_day = new Date();


function App() {
  const [response, setResponse] = useState({});
  const [students, setStudents] = useState([{}]);
  const [studentsToday, setStudentsToday] = useState([{}]);
  const BASE_URL = 'http://localhost:8000/';
  // fetch the student from the backend
  const findStudent = async (student) => {
    const responseFetch = await fetch(BASE_URL + 'add-student/' + student);
    const data = await responseFetch.json();
    setResponse(data);
    console.log(response);
  }
  
  const sampleSize = async() => {
    const responseFetch = await fetch(BASE_URL + 'sample-size');
    const data = await responseFetch.json();
    console.log(data['message']);
  }

  const saveDocument = async () => {
    const responseFetch = await fetch(BASE_URL + 'save-document');
    const data = await responseFetch.json();
    console.log(data['message']);
  }

  const getStudents = async () => {
    const responseFetch = await fetch(BASE_URL + 'get-students');
    const data = await responseFetch.json();
    setStudents(data);
  }   

  useEffect(() => {getStudents()}, []);

  const handleOnSearch = (string, results) => {
    findStudent(string);
  };

  return (
    <div className="App">
      {/* header for the sign in */}
      <header className="App-header">
        Saint Edward Kids Club Sign In<br />

        {/* display the current date */}
        {curr_day.toDateString()}

        <button
          onClick={() => sampleSize()}> test </button>
        {/* input for the student ID */}
          <div className='search'>
          <p>Please enter the student's name.</p>
          <ReactSearchAutocomplete
            items={students}
            onSearch={handleOnSearch}
            styling={{
              height: "45px",
              borderRadius: "4px",
              backgroundColor: "white",
              boxShadow: "none",
              hoverBackgroundColor: "lightgray",
              color: "black",
              fontSize: "18px",
              fontFamily: "Times New Roman",
              iconColor: "black",
              lineColor: "blue",
              placeholderColor: "darkgreen",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
              }} // To display it on top of the search box below
            autoFocus
          />
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
