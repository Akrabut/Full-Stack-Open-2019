import React, { useEffect } from 'react';
import Anecdote from './Anecdote'
import Filter from './Filter'
import CreateAnecdote from './CreateAnecdote'
import { connect } from 'react-redux'

function handleFilter(anecdotes, filterBy = '') {
  return {
    type: 'FILTER',
    data: {
      filterBy,
      anecdotes,
    }
  }
}

const Anecdotes = props => {
  useEffect(() => {
    props.handleFilter(props.anecdotes)
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
  handleFilter
}

function mapStateToProps(state) {
  return {
    anecdotes: state.anecdote,
    filter: state.filter
  }
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default connectedAnecdotes