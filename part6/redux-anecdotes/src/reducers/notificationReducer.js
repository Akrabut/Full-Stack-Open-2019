export const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      state = action.data
      return state
    default:
      return state
  }
}