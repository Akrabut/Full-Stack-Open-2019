import { anecdotesAtStart, sortAnecdotes, asObject, filterAnecdotes } from '../helpers/anecdoteHelper'

const initialState = sortAnecdotes(anecdotesAtStart.map(asObject))

export const anecdoteReducer = (state = initialState, action) => {
  state['filtered'] = state['filtered'] || []
  switch (action.type) {
    case 'VOTE':
      state = sortAnecdotes(state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote))
      state['filtered'] = filterAnecdotes(state, state['filterBy'])
      return state
    case 'CREATE-ANECDOTE':
      return state.concat(asObject(action.data))
    case 'FILTER':
      state['filterBy'] = action.data
      state['filtered'] = filterAnecdotes(state, state['filterBy'])
      return state
    default:
      return state
  }
}
