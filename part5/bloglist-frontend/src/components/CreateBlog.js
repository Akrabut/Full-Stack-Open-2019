import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  function setBlogProperties(status, message) {
    props.setactionStatus(status)
    props.setactionMessage(message)
  }

  async function handleCreate(event) {
    event.preventDefault()
    try {
      const blog = { title, author, url }
      await blogService.create(blog, props.token)
      setBlogProperties('success', `${blog.title} by ${blog.author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(error) {
      setBlogProperties('error', error.response.data.error)
    }
    
  }

  return (
    <form id="new-blog-form" onSubmit={handleCreate}>
      <h2>Create new blog</h2>
      {`title `}<input type="text" required onChange={event => setTitle(event.target.value)}></input>
      <br></br>
      {`author `}<input type="text" required onChange={event => setAuthor(event.target.value)}></input>
      <br></br>
      {`url `}<input type="url" required onChange={event => setUrl(event.target.value)}></input>
      <br></br>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog