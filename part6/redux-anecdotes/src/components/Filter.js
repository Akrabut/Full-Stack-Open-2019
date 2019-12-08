import React from 'react'

function handleFilter(event, anecdotes, handler) {
  handler(anecdotes, event.target.value)
}

const Filter = props => {
  return (
    <div id="filter">
      filter -
      <input type="text" onChange={(event) => handleFilter(event, props.anecdotes, props.handler)}></input>
    </div>
  )
}

export default Filter