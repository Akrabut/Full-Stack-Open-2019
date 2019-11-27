import React from 'react';
import Anecdote from './Anecdote'

const Anecdotes = props => {
  return (
    <div id="anecdotes">
      <h2 id="anecdote-header">Anecdotes</h2>
      <ul id="anecdote-list">
        {props.anecdotes.map(anecdote => (
          <Anecdote key={anecdote.id} dispatch={props.dispatch} anecdote={anecdote}/>
        ))}
      </ul>
    </div>
  )
}

export default Anecdotes