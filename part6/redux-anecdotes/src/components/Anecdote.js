import React from 'react';
import { connect } from 'react-redux'

function vote(anecdote) {
  return {
    type: 'VOTE',
    data: {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
  }
}

function set(content) {
  return {
    type: 'SET',
    data: content
  }
}

function handleVote(anecdote, vote, stateAlert, set) {
  vote(anecdote)
  stateAlert()
  set(anecdote.content)
}

const Anecdote = props => {
  return (
    <li className="anecdote">
      {props.anecdote.content}      
      <br></br>
      has {props.anecdote.votes}
      <button id="vote-anecdote" onClick={() => handleVote(props.anecdote, props.vote, props.stateAlert, props.set)}>vote</button>
    </li>
  )
}

const mapDispatchToProps = {
  vote, set
}

const connectedAnecdote = connect(null, mapDispatchToProps)(Anecdote)
export default connectedAnecdote