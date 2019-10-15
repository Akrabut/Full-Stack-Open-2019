import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <div>
        <h2>Part {props.num} is {props.part.name}</h2>
        <h3>It has {props.part.exercises} exercises</h3>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <p>
        <Part num={1} part={props.parts[0]}></Part>
        <Part num={2} part={props.parts[1]}></Part>
        <Part num={3} part={props.parts[2]}></Part>
      </p>
    )
  }

  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <h2>The total amount of exercises is {total}</h2>
    )
  }
  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))