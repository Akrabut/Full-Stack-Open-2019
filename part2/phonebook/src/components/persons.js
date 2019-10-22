import React, {useState} from 'react'
import {destroy} from '../services/server_communication'

// const generateId = () => {
//   function getNum() {
//     const date = new Date()
//     return `${date.getDate()}${date.getMilliseconds()}`
//   }
//   return setTimeout(getNum, 1)
// }


const Person = props => {
  const handleDelete = (event) => {
    const val = event.target.value.split(',')
    if (window.confirm(`Are you sure you want to delete ${val[1]}?`)) {
      destroy(val[0])
      props.toggle()
    }
  }

  return (
    <div>
      {`${props.person.name} - ${props.person.number} `}
      <button value={[props.person.id, props.person.name]} onClick={handleDelete}>delete</button>
    </div>
  )
}

const Persons = (props) => {
  const [deleted, setDeleted] = useState(false)

  // this should be passed as a callback ot the child to toggle deleted
  // this doesn't seem to work for some reason although it was suggested as a solution by other people...
  function toggle() {
    console.log(deleted);
    setDeleted(!deleted)
    console.log(deleted);
  }

  return (
    <ul>
      {props.persons.map(person => <li key={person.id}><Person person={person} toggle={toggle}></Person></li>)}
    </ul>
  )
}

export default Persons