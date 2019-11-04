import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = props => {
  const [blogs, setBlogs] = useState([])
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(`bearer ${props.token}`)
    blogService.getAll().then(res => setBlogs(res))  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="blogs">
      <h2>Blogs</h2>
      <ol id="blog-list">
        {blogs.map(blog => <Blog key={blog.id} blog={blog}></Blog>)}
      </ol>
    </div>
  )
}

export default Blogs