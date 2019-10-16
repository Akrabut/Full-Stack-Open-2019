import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Buttons = (props) => {
  return (
    <div>
      <Button handleClick={() => props.setGood(props.good + 1)} text='good' />
      <Button handleClick={() => props.setNeutral(props.neutral + 1)} text='neutral' />
      <Button handleClick={() => props.setBad(props.bad + 1)} text='bad' />
    </div>
  )
}

const AnecdoteButton = (props) => {
  const randomAnecdote = () => props.anecdotes[Math.floor(Math.random() * props.anecdotes.length)]
  return (
    <div>
      <Button handleClick={() => props.setAnecdote(randomAnecdote())} text='Press for a random anecdote!' />
    </div>
  )
}

const DisplayAnecdote = (props) => {
  if (!props.anecdote) return ''

  return (
    <div>
      {props.anecdote}
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
  const [anecdote, setAnecdote] = useState(null)

  const anecdotes = [
    'React components should not be nested within other components',
    `'Akatsuki' means 'dawn' in Japanese`,
    'These are just random anecdotes',
    'One of the space probes that circles around the moon is named Artemis, after the moon goddess in the Greek mythology',
    `A chinese spacecraft that has recently landed on the moon is named Chan'ge, after the Chinese goddess of the moon`,
    `Why are there only godesses of the moon and not gods? that's unfair`,
    `'Mehubar' means connected in Hebrew`,
    '8 anecdotes are more than enough for this exercise'
  ]

  return (
    <div>
      <h2>Give feedback</h2>
      <Buttons good={good} neutral={neutral} bad={bad}
        setGood={setGood} setNeutral={setNeutral} setBad={setBad}></Buttons>
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad}></Display>
      <h2>A random anecdote</h2>
      <AnecdoteButton anecdotes={anecdotes} setAnecdote={setAnecdote}></AnecdoteButton>
      <DisplayAnecdote anecdote={anecdote}></DisplayAnecdote>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)