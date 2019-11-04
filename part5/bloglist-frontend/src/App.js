import React, { useState } from 'react';
import Blogs from './components/Blogs'
import Login from './components/Login';

function App() {
  const [token, setToken] = useState('')

  function displayBlogs() {
    return (token ? <Blogs token={token}></Blogs> : '')
  }

  return (
    <div className="App">
      <Login setToken={setToken}></Login>
      {displayBlogs()}
    </div>
  );
}

export default App;
