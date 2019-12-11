import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      has {anecdote.votes} votes
      <br></br>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </div>
  )
}

export default Anecdote