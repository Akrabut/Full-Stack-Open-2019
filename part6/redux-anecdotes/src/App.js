import React from 'react';
import Anecdotes from './components/Anecdotes'
import CreateAnecdote from './components/CreateAnecdote'
import Notification from './components/Notification'

const App = (props) => {
  const anecdotes = props.store.getState().anecdote

  return (
    <div>
      <Notification dispatch={props.store.dispatch} notification={props.store.getState().notification} />
      <Anecdotes dispatch={props.store.dispatch} anecdotes={anecdotes}/>
      <CreateAnecdote dispatch={props.store.dispatch}/>
    </div>
  )
}

export default App