import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Persons from './components/persons'


const App = () => {
  //const set = new Set().add('Arto Hellas')
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [personSet, setSet] = useState(new Set().add('Arto Hellas'))
  const [newName, setNewName] = useState('')

  // called upon submission, prevents default behavior (for forms - refresh upon submission)
  // and appends the newName to the persons array, then resets newName
  const addPerson = (event) => {
    event.preventDefault()
    if (personSet.has(newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    setPersons(persons.concat({name: newName}))
    setSet(personSet.add(newName))
    setNewName('')
  }

  // takes an event as an argument (as it responds on an onChange event)
  // sets newName with the event.target (the form).value whichi s basically the input in the text field
  // TODO: im not really sure how this part works
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* calls the addPerson callback upon submission */}
      <form onSubmit={addPerson}>
        <div>
          {/* a text input that sets its value to newName and has handleNameChange callback
          upon change of newName */}
          name:<input value={newName} onChange={handleNameChange}></input>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Persons persons={persons}></Persons>
      </div>
    </div>
  )
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)