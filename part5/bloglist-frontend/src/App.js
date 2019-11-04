import React, { useState } from 'react';
import Blogs from './components/Blogs'
import Login from './components/Login';
import CreateBlog from './components/CreateBlog'

function App() {
  const [token, setToken] = useState('')
  const [blogAdded, setBlogAdded] = useState(false)

  function changeblogAdded() {
    setBlogAdded(!blogAdded)
  }

  function displayBlogs() {
    return (token ? <Blogs></Blogs> : '')
  }

  function newBlogForm() {
    return (token ? <CreateBlog token={token} changeblogAdded={changeblogAdded}></CreateBlog> : '')
  }
  console.log(blogAdded);
  return (
    <div className="App">
      <Login setToken={setToken}></Login>
      {displayBlogs()}
      {newBlogForm()}
    </div>
  );
}

export default App;
