import React, { useState } from 'react'

const Blog = ({ blog }) => {
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
      <article id="blog-without-details">
        {blog.title}
      </article>
    )
  }

  function displayDetails() {
    return (
      <article id="blog-with-details">
        {blog.title} - by {blog.author}
        <br></br>
        {blog.url}
      </article>
    )
  }

  return (
    <div id="blog" onClick = {() => setVisibility(!visibility)} style={style}>
      {visibility ? displayDetails() : hideDetails()}
    </div>
  )
}

export default Blog