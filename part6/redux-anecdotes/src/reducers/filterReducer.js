import { filterAnecdotes, sortAnecdotes } from '../helpers/filterHelper'

const initialState = { filterBy: '', filtered: [] }

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      console.log(action.data);
      return {
        filterBy: action.data.filterBy,
        filtered: sortAnecdotes(filterAnecdotes(action.data.anecdotes, action.data.filterBy)),
      }
    default:
      return state
  }
}