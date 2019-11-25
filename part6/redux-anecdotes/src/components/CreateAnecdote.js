import React from 'react';

const CreateAnecdote = props => {
  function handleCreate(event) {
    event.preventDefault()
    props.dispatch({
      type: 'CREATE-ANECDOTE',
      data: event.target.content.value,
    })
    event.target.content.value = ''
  }

  return (
    <form id="new-anecdote-form" onSubmit={handleCreate}>
      <h2 id="create-anecdote-header">Create new anecdote</h2>
      <input type="text" name="content" required></input>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateAnecdote