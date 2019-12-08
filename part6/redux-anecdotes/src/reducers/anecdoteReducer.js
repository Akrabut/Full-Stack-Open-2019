import { anecdotesAtStart, asObject } from '../helpers/anecdoteHelper'

const initialState = anecdotesAtStart.map(asObject)

export const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      state = state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote)
      return state
    case 'CREATE':
      return state.concat(asObject(action.data))
    case 'SET-ALL':
      console.log(action.data);
      return action.data
    default:
      return state
  }
}
