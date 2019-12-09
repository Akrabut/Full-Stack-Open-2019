import React from 'react';
import { connect } from 'react-redux'
import { anecdoteHelper } from '../helpers/anecdoteHelper'

function handleVote(anecdote, vote, set) {
  vote(anecdote)
  anecdoteHelper.setNotification(anecdote.content, 5000, set)
}

const Anecdote = props => {
  return (
    <li className="anecdote">
      {props.anecdote.content}      
      <br></br>
      has {props.anecdote.votes}
      <button id="vote-anecdote" onClick={() => handleVote(props.anecdote, props.vote, props.set)}>vote</button>
    </li>
  )
}

const mapDispatchToProps = {
  vote: anecdoteHelper.vote,
  set: anecdoteHelper.set,
}

const connectedAnecdote = connect(null, mapDispatchToProps)(Anecdote)
export default connectedAnecdote