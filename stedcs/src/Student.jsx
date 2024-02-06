import React from 'react';
const Student = ({studentName, message}) => {
    console.log(message['name']);
    if(message['name'] === 'Student not found') {
        return (
            <div className="Student">
                <p>Student not found. Please try again. </p>
            </div>
        )
    }
    return (
        <div className="Student">
            <p>Welcome, {studentName}! </p>
        </div>
    )
}

export default Student;