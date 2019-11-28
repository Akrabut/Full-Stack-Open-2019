import React from 'react'

const Filter = props => {
  function handleFilter(event) {
    props.store.dispatch({
      type: 'FILTER',
      data: event.target.value,
    })
  }

  return (
    <div id="filter">
      filter
      <input type="text" onChange={handleFilter}></input>
    </div>
  )
}

export default Filter