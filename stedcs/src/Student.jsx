import React from 'react';
const Student = ({studentID}) => {
    const curr_ID = studentID;
    return curr_ID.length === 6 ? (
        <div className="Student">
            <p>Welcome, {curr_ID}! </p>
        </div>
    )
    :
    (
        <div className="Student"></div>
    )
}

export default Student;