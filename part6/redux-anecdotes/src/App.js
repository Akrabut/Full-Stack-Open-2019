import React from 'react';
import Anecdotes from './components/Anecdotes'

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
  }

  return (
    <div>
      <Anecdotes dispatch={props.store.dispatch} anecdotes={anecdotes} vote={vote}/>
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App