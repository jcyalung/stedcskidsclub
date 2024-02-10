import React from 'react';
import { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Student from './Student';
import './App.css';
const today = new Date();


function App() {
  const [message, setMessage] = useState({});
  const [students, setStudents] = useState([{}]);
  const [documentPrinted, setDocumentPrinted] = useState(false);
  const [sheetPrinted, setSheetPrinted] = useState(false);
  const [numStudents, setNumStudents] = useState(0);
  const BASE_URL = 'http://localhost:8000/';

  // fetch the student from the backend
  const signInStudent = async (student) => {
    const responseFetch = await fetch(BASE_URL + 'add-student/' + student);
    const data = await responseFetch.json();
    setMessage(data);
    console.log(data);
    if(data['message'] === 'Student signed in') { setNumStudents(numStudents + 1); }
  }

  const saveDocument = async () => {
    const responseFetch = await fetch(BASE_URL + 'save-document');
    const data = await responseFetch.json();
    setDocumentPrinted(true);
    console.log(data['message']);
  }

  const saveData = async () => {
    const responseFetch = await fetch(BASE_URL + 'save-data');
    const data = await responseFetch.json();
    setSheetPrinted(true);
    console.log(data['message']);
  }

  const getStudents = async () => {
    const responseFetch = await fetch(BASE_URL + 'get-students');
    const data = await responseFetch.json();
    setStudents(data);
  }   

  const signOutStudent = async (student) => {
    console.log('signing out student');
    const responseFetch = await fetch(BASE_URL + 'sign-out/' + student);
    const data = await responseFetch.json();
    if(data['message'] === 'Student has not signed in yet') {
      signInStudent(student);
    }
    else { setNumStudents(numStudents - 1); }
    console.log(data);
    setMessage(data);
  }

  // removes a student from the current number of students
  // commonly used to undo the last action
  const removeStudent = async () => {
    if(!documentPrinted) {
      const responseFetch = await fetch(BASE_URL + 'remove-student');
      const data = await responseFetch.json();
      setMessage(data);
      console.log(data);
      if(message['message'] === 'Removed student') { setNumStudents(numStudents - 1); }
    }
  }

  // fetch all students from the backend
  useEffect(() => {getStudents()}, []);

  // when user presses enter on search bar, sign in the student/sign out the student
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
        <Student message={message} />
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
