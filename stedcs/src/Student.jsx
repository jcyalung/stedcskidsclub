import React from 'react';
const Student = ({message}) => {
    if(message['message'] === 'Removed student') {
        return(<div className="Student">
            <p>{message['name'] + ' has been removed.'}</p>
        </div>)
    }
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
    if(message['message'] === 'Student has already signed in') {
        return(<div className="Student">
            <p>{message['name'] + ' has already signed in.'}</p>
        </div>)
    }
    if(message['message'] === 'Student has already signed out') {
        return(<div className="Student">
            <p>{message['name'] + ' has already signed out.'}</p>
        </div>)
    }
    return (
        <div className="Student">
            {message['message'] === 'Student signed in' ? 
                    <p>{'Welcome, ' + message['name'] + '!' }</p> : ''}
        </div>
    )
}

export default Student;