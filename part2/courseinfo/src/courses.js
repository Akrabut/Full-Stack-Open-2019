import React from 'react'

const randomKey = () => {
  const elemKey = () => {
    const date = new Date()
    // the element unique id is set by the current date and milliseconds
    // the operation is too fast so two elements can be generated in one millisecond
    // setTimeout slows it down by 1 millisecond so that every element has a unique id
    return `${date.getTime()}${date.getMilliseconds()}`
  }
  return setTimeout(elemKey, 1)
}

const Header = props =>
  <h1>{props.course}</h1>

const Total = props => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)

  return <p>Total of {total} exercises</p>
}


const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
  const listElement = (part) => (
    <li key={randomKey()}>
      <Part part={part}></Part>
    </li>
  )
  return (
    <ul>
      {props.parts.map((part) => listElement(part))}
    </ul>
  )
}

const Course = props => {
  return (
    <div>
      <Header course={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
      <Total parts={props.course.parts}></Total>
    </div>
  )
}

const Courses = props => {
  const listElement = course => (
    <li key={randomKey(course)}>
      <Course course={course}></Course>
    </li>
  )
  return (
    <ul>
      {props.courses.map(course => listElement(course))}
    </ul>
  )
}

export default Courses