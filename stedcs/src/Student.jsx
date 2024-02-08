import React from 'react';
const Student = ({message}) => {
    if(message['message'] === 'Student signed out') {
        return(<div className="Student">
            <p>{message['name'] + ' has been signed out.'}</p>
            </div>);
    }
    if(message['message'] === 'Student has not signed in yet') {
        return(<div className="Student">
            <p>{message['name'] + ' has not signed in yet.'}</p>
        </div>)
    }
    if(message['message'] === 'Student is already checked in') {
        return(<div className="Student">
            <p>{message['name'] + ' has already checked in.'}</p>
        </div>)
    }
    return (
        <div className="Student">
            {message['message'] === 'Student found' ? 
                    <p>{'Welcome, ' + message['name'] + '!' }</p> : ''}
        </div>
    )
}

export default Student;