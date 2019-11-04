import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  async function handleCreate(event) {
    event.preventDefault()
    try {
      const blog = { title, author, url }
      await blogService.create(blog, props.token)
      props.changeblogAdded()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(error) { console.log(error) }
    
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