import React, { useEffect } from 'react';
import Anecdote from './Anecdote'
import Filter from './Filter'

const Anecdotes = props => {
  useEffect(() => {
    props.store.dispatch({
      type: 'FILTER',
      data: '',
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const anecdotes = props.store.getState().anecdote
  console.log(anecdotes['filtered']);

  return (
    <div id="anecdotes">
      <Filter store={props.store}></Filter>
      <ul id="anecdote-list">
        {anecdotes['filtered'].map(anecdote => (
          <Anecdote key={anecdote.id} dispatch={props.store.dispatch} anecdote={anecdote}/>
        ))}
      </ul>
    </div>
  )
}

export default Anecdotes