import React from 'react';

const Anecdote = props => {
  const vote = () => {
    props.dispatch({
      type: 'VOTE',
      data: {
        ...props.anecdote,
        votes: props.anecdote.votes + 1,
      }
    })
  }

  return (
    <li className="anecdote">
      {props.anecdote.content}      
      <br></br>
      has {props.anecdote.votes}
      <button id="vote-anecdote" onClick={() => vote()}>vote</button>
    </li>
  )
}

export default Anecdote