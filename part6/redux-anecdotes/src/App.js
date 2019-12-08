import React from 'react';
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'

const App = (props) => {
  return (
    <div>
      <h2 id="anecdote-header">Anecdotes</h2>
      <Notification/>
      <Anecdotes/>
    </div>
  )
}

export default App