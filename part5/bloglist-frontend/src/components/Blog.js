import React from 'react'

const Blog = ({ blog }) => (
  <li>
    {blog.title} - by {blog.author}
    <br></br>
    {blog.url}
  </li>
)

export default Blog