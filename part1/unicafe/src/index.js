import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const totalFunc = () => props.good + props.neutral + props.bad
  const total = totalFunc()

  return (
    <div>
      total - {total}
      <br></br>
      average - {((props.good - props.bad) / total) || 0}
      <br></br>
      positive - {(props.good / total) || 0} %
    </div>
  )
}

const Display = (props) => {

  if (!props.good && !props.neutral && !props.bad) return 'No feedback given'

  return (
    <div>
      good - {props.good}
      <br></br>
      neutral - {props.neutral}
      <br></br>
      bad - {props.bad}
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad}></Statistics>
    </div>
  )
}

const App = () => {
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
      <Display good={good} neutral={neutral} bad={bad}></Display>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)