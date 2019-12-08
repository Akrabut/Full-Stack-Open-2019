function filterAnecdotes(anecdotes, textToFind = '') {
  return anecdotes.filter(anecdote => anecdote.content.includes(textToFind))
}

function sortAnecdotes(anecdotes) {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

function handleFilter(anecdotes, filterBy = '') {
  return {
    type: 'FILTER',
    data: {
      filterBy,
      anecdotes,
    }
  }
}

export { filterAnecdotes, sortAnecdotes, handleFilter }