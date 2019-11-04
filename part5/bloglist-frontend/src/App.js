import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs'
import Login from './components/Login';

function App() {
  const [logged, setLogged] = useState(false)

  function displayBlogs() {
    return (logged ? <Blogs></Blogs> : '')
  }

  return (
    <div className="App">
      <Login logged={logged} setLogged={setLogged}></Login>
      {displayBlogs()}
    </div>
  );
}

export default App;
