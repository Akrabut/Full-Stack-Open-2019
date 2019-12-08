import React from 'react';
import { connect } from 'react-redux'
import { asObject } from '../helpers/anecdoteHelper'
import { create } from '../services/anecdotes'

async function createAnecdote(event) {
  event.preventDefault()
  const createdAnecdote = await create(asObject(event.target.content.value))
  const obj = {
    type: 'CREATE',
    data: createdAnecdote,
  }
  event.target.content.value = ''
  return obj
}

function handleCreate(event, stateAlert, connectedCreate) {
  connectedCreate(event)
  stateAlert()
}

const CreateAnecdote = props => {
  return (
    <form id="new-anecdote-form" onSubmit={(event) => handleCreate(event, props.stateAlert, props.createAnecdote)}>
      <h2 id="create-anecdote-header">Create new anecdote</h2>
      <input type="text" name="content" required></input>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
}

const connectedCreateAnecdote = connect(null, mapDispatchToProps)(CreateAnecdote)
export default connectedCreateAnecdote