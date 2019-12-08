const asObject = (anecdote) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

function setAll(anecdotes) {
  return {
    type: 'SET-ALL',
    data: anecdotes,
  }
}

function vote(anecdote) {
  return {
    type: 'VOTE',
    data: {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
  }
}

function set(content) {
  return {
    type: 'SET',
    data: content
  }
}

export const createHelper = { asObject }
export const anecdoteHelper = { vote, set }
export const anecdotesHelper = { setAll }