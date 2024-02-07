import React from 'react';
const Student = ({studentName, message}) => {
    if(message['name'] === undefined) {
        return (
            <div className="notFound"></div>
        )
    }
    return (
        <div className="Student">
            <p>Welcome, {studentName}! </p>
        </div>
    )
}

export default Student;