import { getAll } from '../services/anecdotes'
import { postAnecdote, updateAnecdote } from '../services/anecdotes'

const asObject = (anecdote) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

function setAll() {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'SET_ALL',
      data: anecdotes,
    })
  }
}

function vote(anecdote) {
  return async dispatch => {
    const updatedAnecdote = await updateAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

function setNotification(content, time, setCallback) {
  setCallback(content)
  setTimeout(() => {
    setCallback('')
  }, time)
}

function set(content) {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: content
    })
  }
}

function create(content) {
  return async dispatch => {
    const createdAnecdote = await postAnecdote(asObject(content))
    dispatch({
      type: 'CREATE',
      data: createdAnecdote,
    })
  }
}

function stateAlert(handleFilter, anecdotes, filterBy) {
  handleFilter(anecdotes, filterBy)
}

function createAnecdote(event, createCallback) {
  event.preventDefault()
  createCallback(event.target.content.value)
  event.target.content.value = ''
}

export const createHelper = { create, createAnecdote }
export const anecdoteHelper = { vote, set, setNotification }
export const anecdotesHelper = { setAll, stateAlert }