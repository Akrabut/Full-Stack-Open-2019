import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const addNew = (setAnecdotes, anecdotes, anecdote) => {
  anecdote.id = (Math.random() * 10000).toFixed(0)
  setAnecdotes(anecdotes.concat(anecdote))
}

function setEmpty(...functions) {
  functions.forEach(functionToCall => functionToCall(''))
}

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setSubmitted(false)
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew(
      props.setAnecdotes,
      props.anecdotes,
      {
      content,
      author,
      info,
      votes: 0,
      }
    )
    setEmpty(setContent, setAuthor, setInfo)
    setSubmitted(true)
  }

  function toDisplay() {
    if (submitted) return <Redirect to='/anecdotes'/>
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }

  return toDisplay()
}

export default CreateNew