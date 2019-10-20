import React from 'react'

const generateId = () => {
  function getNum() {
    const date = new Date()
    return `${date.getDate()}${date.getMilliseconds()}`
  }
  return setTimeout(getNum, 1)
}

const Person = props => props.person.name

const Persons = (props) => (
  <ul>
    {props.persons.map(person => <li key={generateId()}><Person person={person}></Person></li>)}
  </ul>
)

export default Persons