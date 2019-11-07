import React, { useState, useEffect } from 'react'
// import blogService from '../services/blogs'
import { Blog, blogService } from './Blog'
import CreateBlog from './CreateBlog'

const Blogs = props => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.readAll().then(res => setBlogs(res.sort((blog1, blog2) => blog2.likes - blog1.likes))) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function addBlog(blog) {
    setBlogs(blogs.concat(blog))
  }

  async function handleDelete(blog) {
    if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) return
    try {
      await blogService.deleteBlog(blog.id, props.token)
      const index = blogs.findIndex(toFind => blog.id === toFind.id)
      const temp = Array.from(blogs)
      temp.splice(index, 1)
      setBlogs(temp)
    } catch(error) { 
      props.setErrorProperties('error', error.response.data.error)
     }
  }

  return (
    <main id="blogs">
      <h2>Blogs</h2>
      <ol id="blog-list">
        {blogs.map(blog => <li key={blog.id}><Blog blog={blog} loggedUserId={props.loggedUserId} handleDelete={handleDelete}/></li>)}
      </ol>
      <CreateBlog token={props.token} setErrorProperties={props.setErrorProperties} addBlog={addBlog}/>
    </main>
  )
}

export default Blogs