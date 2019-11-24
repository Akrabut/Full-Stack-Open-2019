import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import feedbackReducer from './reducers/feedback_reducer'

const store = createStore(feedbackReducer)

const App = () => {

  return (
    <div>
      <p>good - {store.getState().good}</p>
      <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
      <p>neutral - {store.getState().ok}</p>
      <button onClick={() => store.dispatch({ type: 'OK' })}>neutral</button>
      <p>bad - {store.getState().bad}</p>
      <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
      <br></br>
      <button onClick={() => store.dispatch({ type: 'ZERO' })}>reset stats</button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)