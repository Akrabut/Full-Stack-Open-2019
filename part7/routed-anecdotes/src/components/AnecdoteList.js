import React from 'react'

// const anecdoteById = (anecdotes, id) =>
//   anecdotes.find(a => a.id === id)

// const vote = (setAnecdotes, anecdotes, id) => {
//   const anecdote = anecdoteById(id)

//   const voted = {
//     ...anecdote,
//     votes: anecdote.votes + 1
//   }

//   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
// }

const AnecdoteList = ({ anecdotes, setAnecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)

export default AnecdoteList