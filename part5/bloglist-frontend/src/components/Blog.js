import React, { useState } from 'react'
import { Likes, blogService } from './Likes'

const Blog = ({ blog, handleDelete }) => {
  const [visibility, setVisibility] = useState(false)

  const style = {
    paddingTop: 10,
    background: 'inherit',
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  function hideDetails() {
    return (
      <article id="blog-without-details" onClick={() => setVisibility(!visibility)}>
        {blog.title}
      </article>
    )
  }

  function displayDetails() {
    return (
      <article id="blog-with-details">
        <div id="clickable-content" onClick={() => setVisibility(!visibility)}>
          {blog.title} - by {blog.author}
          <br></br>
          {blog.url}
          <br></br>
          Uploaded by {blog.user.name}
        </div>
        <Likes blog={blog}/>
        <button onClick={() => handleDelete(blog)} style={{background: 'lightBlue'}}>delete</button>
      </article>
    )
  }

  return (
    <div id="blog"  style={style}>
      {visibility ? displayDetails() : hideDetails()}
    </div>
  )
}

export { Blog, blogService }