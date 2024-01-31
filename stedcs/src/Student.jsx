import React from 'react';
const Student = ({studentID}) => {
    const curr_ID = studentID;
    console.log('curr id in student:' + curr_ID);
    if(curr_ID === '123456') {
        return (
            <div className="Student">
                <p>Invalid ID. Please try again. </p>
            </div>
        )
    }
    else {
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
}

export default Student;