import React from 'react';
const Student = ({message}) => {
    if(message['message'] === 'Student not found') {
        return (
            <div className="notFound">
                <p>Student not found</p>
            </div>
        )
    }
    return (
        <div className="Student">
            <p>{[message['message'] === 'Student found' ? 
                    'Welcome, ' + message['name'] + '!' : 
                    'Student has already signed in.']}</p>
        </div>
    )
}

export default Student;