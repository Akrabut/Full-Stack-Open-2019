import React, { useEffect } from 'react';
import Anecdote from './Anecdote'
import Filter from './Filter'
import CreateAnecdote from './CreateAnecdote'
import { connect } from 'react-redux'
import { anecdotesHelper } from '../helpers/anecdoteHelper'
import { handleFilter } from '../helpers/filterHelper'

const Anecdotes = props => {
  useEffect(() => {
    props.setAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    anecdotesHelper.stateAlert(props.handleFilter, props.anecdotes, props.filter.filterBy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.anecdotes])

  return (
    <div id="anecdotes">
      <Filter handler={props.handleFilter} anecdotes={props.anecdotes}></Filter>
      <ul id="anecdote-list">
        {props.filter.filtered.map(anecdote => (
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={props.vote}/>
        ))}
      </ul>
      <CreateAnecdote/>
    </div>
  )
}

const mapDispatchToProps = {
  handleFilter, 
  setAll: anecdotesHelper.setAll,
}

function mapStateToProps(state) {
  return {
    anecdotes: state.anecdote,
    filter: state.filter,
  }
}

const connectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
export default connectedAnecdotes