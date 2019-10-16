import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <div>
    {props.text} {props.value}
  </div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (param, func) => {
    func(param)
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => handleClick(good + 1, setGood)} text='good' />
      <Button handleClick={() => handleClick(neutral + 1, setNeutral)} text='neutral' />
      <Button handleClick={() => handleClick(bad + 1, setBad)} text='bad' />
      <h2>Statistics</h2>
      <Display value={good} text='good'></Display>
      <Display value={neutral} text='neutral'></Display>
      <Display value={bad} text='bad'></Display>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)