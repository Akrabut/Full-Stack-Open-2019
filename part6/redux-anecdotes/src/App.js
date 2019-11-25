import React from 'react';
import Anecdotes from './components/Anecdotes'
import CreateAnecdote from './components/CreateAnecdote'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
  }

  return (
    <div>
      <Anecdotes dispatch={props.store.dispatch} anecdotes={anecdotes} vote={vote}/>
      <CreateAnecdote dispatch={props.store.dispatch}/>
    </div>
  )
}

export default App