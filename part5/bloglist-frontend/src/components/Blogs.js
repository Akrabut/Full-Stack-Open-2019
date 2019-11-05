import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const Blogs = props => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.readAll().then(res => setBlogs(res)) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function addBlog(blog) {
    setBlogs(blogs.concat(blog))
  }

  return (
    <div id="blogs">
      {console.log(blogs)}
      <h2>Blogs</h2>
      <ol id="blog-list">
        {blogs.map(blog => <Blog key={blog.id} blog={blog}></Blog>)}
      </ol>
      <CreateBlog token={props.token} setactionStatus={props.setactionStatus} setactionMessage={props.setactionMessage}
          addBlog={addBlog}/>
    </div>
  )
}

export default Blogs