import React from 'react';
import Anecdotes from './components/Anecdotes'
import CreateAnecdote from './components/CreateAnecdote'
import Notification from './components/Notification'

const App = (props) => {

  return (
    <div>
      <h2 id="anecdote-header">Anecdotes</h2>
      <Notification dispatch={props.store.dispatch} notification={props.store.getState().notification}/>
      <Anecdotes store={props.store}/>
      <CreateAnecdote dispatch={props.store.dispatch}/>
    </div>
  )
}

export default App