import React, { useState } from 'react';
import Blogs from './components/Blogs'
import Login from './components/Login';
import Notification from './components/Notification'

function App() {
  const [token, setToken] = useState('')
  const [actionStatus, setactionStatus] = useState('')
  const [actionMessage, setactionMessage] = useState('')

  function displayNotification() {
    if (!actionStatus) return
    setTimeout(() => {
      setactionStatus('')
      setactionMessage('')
    }, 7500)
    return <Notification type={actionStatus} message={actionMessage}/>
  }

  function displayBlogs() {
    return (token ? <Blogs token={token} setactionStatus={setactionStatus} setactionMessage={setactionMessage}/> : '')
  }

  return (
    <div className="App">
      {displayNotification()}
      <Login setToken={setToken} setactionStatus={setactionStatus} setactionMessage={setactionMessage}/>
      {displayBlogs()}
    </div>
  );
}

export default App;
