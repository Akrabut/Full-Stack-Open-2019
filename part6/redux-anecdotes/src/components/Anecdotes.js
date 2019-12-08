import React, { useEffect } from 'react';
import Anecdote from './Anecdote'
import Filter from './Filter'
import CreateAnecdote from './CreateAnecdote'
import { connect } from 'react-redux'
import getAll from '../services/anecdotes'

function handleFilter(anecdotes, filterBy = '') {
  return {
    type: 'FILTER',
    data: {
      filterBy,
      anecdotes,
    }
  }
}

function setAll(anecdotes) {
  return {
    type: 'SET-ALL',
    data: anecdotes,
  }
}

const Anecdotes = props => {
  useEffect(() => {
    async function setAnecdotes() {
      props.setAll(await getAll())
      props.handleFilter(props.anecdotes)
    }
    setAnecdotes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function stateAlert() {
    console.log(props.anecdotes);
    props.handleFilter(props.anecdotes, props.filter.filterBy)
  }

  return (
    <div id="anecdotes">
      <Filter handler={props.handleFilter} anecdotes={props.anecdotes}></Filter>
      <ul id="anecdote-list">
        {props.filter.filtered.map(anecdote => (
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={props.vote} stateAlert={stateAlert}/>
        ))}
      </ul>
      <CreateAnecdote stateAlert={stateAlert}/>
    </div>
  )
}

const mapDispatchToProps = {
  handleFilter, setAll
}

function mapStateToProps(state) {
  return {
    anecdotes: state.anecdote,
    filter: state.filter
  }
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default connectedAnecdotes