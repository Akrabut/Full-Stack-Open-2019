import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Buttons = (props) => {
  const handleClick = (param, func) => {
    func(param)
  }

  return (
    <div>
      <Button handleClick={() => handleClick(props.good + 1, props.setGood)} text='good' />
      <Button handleClick={() => handleClick(props.neutral + 1, props.setNeutral)} text='neutral' />
      <Button handleClick={() => handleClick(props.bad + 1, props.setBad)} text='bad' />
    </div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const totalFunc = () => props.good + props.neutral + props.bad
  const total = totalFunc()

  return (
    <div>
      <table>
        <tbody>
          <Statistic text='good' value={props.good}></Statistic>
          <Statistic text='neutral' value={props.neutral}></Statistic>
          <Statistic text='bad' value={props.bad}></Statistic>
          <Statistic text='total' value={total}></Statistic>
          <Statistic text='average' value={((props.good - props.bad) / total) || 0}></Statistic>
          <Statistic text='positive' value={(props.good / total) || 0}></Statistic>
        </tbody>
      </table>
    </div>
  )
}

const Display = (props) => {

  if (!props.good && !props.neutral && !props.bad) return 'No feedback given'

  return (
    <div>
      <Statistics good={props.good} neutral={props.neutral} bad={props.bad}></Statistics>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h2>Give feedback</h2>
      <Buttons good={good} neutral={neutral} bad={bad}
        setGood={setGood} setNeutral={setNeutral} setBad={setBad}
        ></Buttons>
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad}></Display>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)