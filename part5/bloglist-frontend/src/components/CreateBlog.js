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
      const blog = (await blogService.create({ title, author, url }, props.token)).data
      setBlogProperties('success', `${blog.title} by ${blog.author} added`)
      props.addBlog(blog)
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
      {`title `}<input type="text" value={title} required onChange={event => setTitle(event.target.value)}></input>
      <br></br>
      {`author `}<input type="text" value={author} required onChange={event => setAuthor(event.target.value)}></input>
      <br></br>
      {`url `}<input type="url" value={url} required onChange={event => setUrl(event.target.value)}></input>
      <br></br>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlog