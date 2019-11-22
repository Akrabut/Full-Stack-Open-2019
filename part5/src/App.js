import React, { useState } from 'react';
import Blogs from './components/Blogs'
import Login from './components/Login';
import Notification from './components/Notification'

function App() {
  const [token, setToken] = useState('')
  const [actionStatus, setactionStatus] = useState('')
  const [actionMessage, setactionMessage] = useState('')

  function setErrorProperties(status, message) {
    setactionStatus(status)
    setactionMessage(message)
  }

  function displayNotification() {
    if (!actionStatus) return
    setTimeout(() => {
      setErrorProperties('', '')
    }, 7500)
    if (actionStatus && !actionMessage) setactionMessage('An unknown error occured') 
    return <Notification type={actionStatus} message={actionMessage}/>
  }

  function displayBlogs() {
    return (token ? <Blogs token={token} setErrorProperties={setErrorProperties}/> : '')
  }

  return (
    <div className="App">
      <Login setToken={setToken} setErrorProperties={setErrorProperties}/>
      {displayBlogs()}
      {displayNotification()}
    </div>
  );
}

export default App;
