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
  const BASE_URL = 'http://localhost:8000/';

  // fetch the student from the backend
  const findStudent = async (student) => {
    const responseFetch = await fetch(BASE_URL + 'add-student/' + student);
    const data = await responseFetch.json();
    setMessage(data);
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
      findStudent(student);
    }
    console.log(data);
    setMessage(data);
  }

  useEffect(() => {getStudents()}, []);

  const handleOnSearch = (string, results) => {
    documentPrinted ? signOutStudent(string) : findStudent(string);
  };

  return (
    <div className="App">
      {/* header for the sign in */}
      <header className="App-header">
        Saint Edward Kids Club Sign In<br />

        {/* display the current date */}
        {today.toDateString()}

        {/* input for the student ID */}
          <div className='search'>
          {documentPrinted ? 
          <p>Enter the student's name to sign out.</p> 
          : 
          <p>Enter the student's name to sign in.</p>}
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

        <Student message={message} />
        <div className='Document'>
          <p>{ 
            documentPrinted ? 
            'Document has been saved!'
            : 
            'Click the button to save the sign in document.' 
            } </p> 
          <button
          onClick={saveDocument}
          class='button-primary'>
            Save Document
          </button>
          <br></br>
          <p>{sheetPrinted ? 
          'Spreadsheet has been saved!'
          : 
          'Click the button to save the data into a spreadsheet.' 
          }</p>
          <button
          onClick={saveData}
          class='button-primary'>
            Save Data
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
