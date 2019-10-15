import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const total = exercises1+exercises2+exercises3

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <h2>Part {props.num} is {props.part}</h2>
        <h3>It has {props.exercises} exercises</h3>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <p>
        <Part num={1} part={part1} exercises={exercises1}></Part>
        <Part num={2} part={part2} exercises={exercises2}></Part>
        <Part num={3} part={part3} exercises={exercises3}></Part>
      </p>
    )
  }

  const Total = (props) => {
    return (
      <h2>The total amount of exercises is {props.total}</h2>
    )
  }
  return (
    <>
      <Header course={course}></Header>
      <Content></Content>
      <Total total={total}></Total>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))