import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
  <h1>{props.course}</h1>

const Total = props => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return <p>Total of {total} exercises</p>
}


const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
  const elemKey = () => {
    const date = new Date()
    return `${date.getTime()}${date.getMilliseconds()}`}
  const genPart = part => { 
    const randKey = setTimeout(elemKey(), 1)
    return <Part key={randKey} part={part}></Part>}
  return (
    <div>
      {props.parts.map((part) => genPart(part))}
    </div>
  )
}

const Course = props => {
  return (
    <div>
      <Header course={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)