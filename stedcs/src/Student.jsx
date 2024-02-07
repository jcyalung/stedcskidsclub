import React from 'react';
const Student = ({message}) => {
    if(message['name'] === undefined) {
        return (
            <div className="notFound"></div>
        )
    }
    return (
        <div className="Student">
            <p>Welcome, {message['name']}! </p>
        </div>
    )
}

export default Student;