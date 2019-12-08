import { asObject } from '../helpers/anecdoteHelper'

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      state = state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote)
      return state
    case 'CREATE':
      return state.concat(asObject(action.data))
    case 'SET-ALL':
      return action.data
    default:
      return state
  }
}
