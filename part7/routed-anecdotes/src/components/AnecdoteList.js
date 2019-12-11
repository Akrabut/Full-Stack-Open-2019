import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Anecdote from './Anecdote'

const anecdoteById = (anecdotes, id) =>
  anecdotes.find(a => a.id === id)

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
      <Router>
        {anecdotes.map(anecdote => {
          return (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
          )}
        )}
        <Route exact path='/anecdotes/:id' render={({ match }) => <Anecdote anecdote={anecdoteById(anecdotes, match.params.id)}/>}></Route>
      </Router>
    </ul>
  </div>
)

export default AnecdoteList