import React, { useState } from 'react';
import Blogs from './components/Blogs'
import Login from './components/Login';
import CreateBlog from './components/CreateBlog'
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
    return <Notification type={actionStatus} message={actionMessage}></Notification>
  }

  function displayBlogs() {
    return (token ? <Blogs></Blogs> : '')
  }

  function newBlogForm() {
    return (token ? <CreateBlog token={token} setactionStatus={setactionStatus} setactionMessage={setactionMessage}></CreateBlog> : '')
  }

  return (
    <div className="App">
      {displayNotification()}
      <Login setToken={setToken} setactionStatus={setactionStatus} setactionMessage={setactionMessage}></Login>
      {displayBlogs()}
      {newBlogForm()}
    </div>
  );
}

export default App;
