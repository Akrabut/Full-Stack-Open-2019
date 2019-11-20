import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visibility, setVisibility] = useState(false)

  async function handleCreate(event) {
    event.preventDefault()
    try {
      const blog = (await blogService.create({ title, author, url }, props.token)).data
      props.setErrorProperties('success', `${blog.title} by ${blog.author} added`)
      props.addBlog(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(error) {
      props.setErrorProperties('error', error.response.data.error)
    }
  }

  function handleCancel() {
    setVisibility(false)
    props.setErrorProperties('', '')
  }

  function displayForm() {
    return (
      <div id="displayed-form">
        <h2>Create new blog</h2>
        {`title `}<input type="text" value={title} required onChange={event => setTitle(event.target.value)}></input>
        <br></br>
        {`author `}<input type="text" value={author} required onChange={event => setAuthor(event.target.value)}></input>
        <br></br>
        {`url `}<input type="url" value={url} required onChange={event => setUrl(event.target.value)}></input>
        <br></br>
        <button type="submit">create</button>
        <button onClick={handleCancel}>cancel</button>
      </div>
    )
  }

  function hideForm() {
    return (
      <div id="hidden-form">
        <button onClick={() => setVisibility(true)}>add blog</button>
      </div>
    )
  }


  // function setStyle() {
  //   return {
  //     display: visibility
  //   }
  // }

  return (
    <form id="new-blog-form" onSubmit={handleCreate}>
      {visibility ? displayForm() : hideForm()}
    </form>
  )
}

export default CreateBlog