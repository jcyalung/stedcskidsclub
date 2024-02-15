import React from 'react';
import { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Student from './Student';
import './App.css';
const today = new Date();


function App() {
  // JSON messages from backend
  const [message, setMessage] = useState({});
  // list of all students in database
  const [students, setStudents] = useState([{}]);
  // check to see if document was printed
  const [documentPrinted, setDocumentPrinted] = useState(false);
  // check to see if data sheet was printed
  const [sheetPrinted, setSheetPrinted] = useState(false);
  // number of students currently in kids club
  const [numStudents, setNumStudents] = useState(0);

  // url for communicating with backend
  const BASE_URL = 'http://localhost:8000/';

  // fetch the student from the backend
  const signInStudent = async (student) => {
    const responseFetch = await fetch(BASE_URL + 'add-student/' + student);
    const data = await responseFetch.json();
    setMessage(data);
    console.log(data);
    // if student is signing in for the first time, increase count
    if(data['message'] === 'Student signed in') { setNumStudents(numStudents + 1); }
  }

  // generates the sign in document
  const saveDocument = async () => {
    const responseFetch = await fetch(BASE_URL + 'save-document');
    const data = await responseFetch.json();
    // set document printed state to true
    setDocumentPrinted(true);
    console.log(data['message']);
  }

  // saves data into a spreadsheet 
  const saveData = async () => {
    const responseFetch = await fetch(BASE_URL + 'save-data');
    const data = await responseFetch.json();
    // set sheet printed state to true
    setSheetPrinted(true);
    console.log(data['message']);
  }

  // gets all students from database
  const getStudents = async () => {
    const responseFetch = await fetch(BASE_URL + 'get-students');
    const data = await responseFetch.json();
    setStudents(data);
  }   

  // signs out a student given a name
  const signOutStudent = async (student) => {
    console.log('signing out student');
    const responseFetch = await fetch(BASE_URL + 'sign-out/' + student);
    const data = await responseFetch.json();
    // if student hasn't signed in yet, sign them in
    // ex. students who come in after 3:30
    if(data['message'] === 'Student has not signed in yet') {
      signInStudent(student);
    }
    // otherwise, decrease count
    else { setNumStudents(numStudents - 1); }
    // store response
    setMessage(data);
  }

  // removes a student from the current number of students
  // commonly used to undo the last action
  const removeStudent = async () => {
    const responseFetch = await fetch(BASE_URL + 'remove-student');
    const data = await responseFetch.json();
    setMessage(data);
    console.log(data);
    if(message['message'] !== 'No students to remove') { 
      setNumStudents(numStudents - 1);
     }
  }

  // fetch all students from the backend
  useEffect(() => {getStudents()}, []);

  // when user presses enter on search bar, sign in/sign out the student
  const handleOnSelect = (student) => {
    documentPrinted ? signOutStudent(student['name']) : signInStudent(student['name']);
  };

  return (
    <div className="App">
      {/* header for the sign in */}
      <header className="App-header">
        Saint Edward Kids Club Sign In<br/>
        {/* display the current date */}
        {today.toDateString()} <br/>
        {'Current number of students: ' + numStudents}
        </header>
        {/* input for the student ID */}
          <div className='Search'>
          {documentPrinted ? 
          <p>Enter the student's name to sign them out.</p> 
          : 
          <p>Enter the student's name to sign them in.</p>}
          <ReactSearchAutocomplete
            items={students}
            onSelect={handleOnSelect}
            maxResults={5}
            placeholder="Search for a student"
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
              placeholderColor: "black",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 4}}
            autoFocus
          /><button
          onClick={removeStudent} 
          className='button-primary'>
          Undo</button>
          </div>
        
        {/* display message */}
        <Student message={message} />

        {/* document buttons */}
        <div className='Document'>
          <p>{ 
            documentPrinted ? 
            'Document has been generated! Check the signInSheets folder.'
            : 
            'Click the button to generate the sign in document.' 
            } </p> 
          <button
          onClick={saveDocument}
          className='button-primary'>
            Save Document
          </button>
          <br></br>
          <p>{sheetPrinted ? 
          'Spreadsheet has been saved! Check the Logs folder.'
          : 
          'Click the button to save the data into a spreadsheet.' 
          }</p>
          <button
          onClick={saveData}
          className='button-primary'>
            Save Data
          </button>
        </div>
    </div>
  );
}

export default App;
