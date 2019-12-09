import React from 'react';
import { connect } from 'react-redux'
import { createHelper } from '../helpers/anecdoteHelper'

const CreateAnecdote = props => {
  return (
    <form id="new-anecdote-form" onSubmit={(event) => createHelper.createAnecdote(event, props.create)}>
      <h2 id="create-anecdote-header">Create new anecdote</h2>
      <input type="text" name="content" required></input>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  create: createHelper.create,
}

const connectedCreateAnecdote = connect(null, mapDispatchToProps)(CreateAnecdote)
export default connectedCreateAnecdote