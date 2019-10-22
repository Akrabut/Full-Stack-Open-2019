import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Persons from './components/persons'
import Notification from './components/notification'
import Comms from './services/server_communication'


const App = () => {
  const [persons, setPersons] = useState([])
  const [personSet, setSet] = useState(new Set())
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [toSearch, setToSearch] = useState('')
  const [message, setMessage] = useState('')

  function init_set(persons) {
    setSet(persons.reduce((set, person) => set.add(person.name), new Set()))
  }

  useEffect(() => {
      console.log('in use effect');
      Comms.read()
        .then((personsParam) => {
          console.log(personsParam)
          setPersons(personsParam)
          console.log('hi');
          init_set(personsParam)
          console.log('persons set');
        })
        .catch(error => console.log(error))
  }, [])

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(''),  5000)
  }

  const changeNumber = person => {
    if (!window.confirm(`${person.name} is already in the phonebook, replace the old number with a new one?`)) return
    Comms.patch({...person, number: newNumber})
      .then(retPerson => {
        setPersons(persons.map(p => retPerson.id === p.id ? retPerson : p))
        console.log('put operation completed');
        displayMessage(`Number changed to ${newNumber}`)
        setNewName('')
        setNewNumber('')
    })
  }

  // called upon submission, prevents default behavior (for forms - refresh upon submission)
  // and appends the newName to the persons array, then resets newName
  const addPerson = (event) => {
    event.preventDefault()
    console.log(event);
    if (personSet.has(newName)) {
      const person = persons.find(person => person.name === newName)
      if (newNumber !== person.number) return changeNumber(person)
      return alert(`${newName} is already in the phonebook`)
    }
    Comms.create({name: newName, number: newNumber})
      .then((person) => {
        setPersons(persons.concat(person))
        setSet(personSet.add(person.name))
        displayMessage(`${person.name} added`)
        setNewName('')
        setNewNumber('')
      })
  }

  // takes an event as an argument (as it responds on an onChange event)
  // sets newName with the event.target (the form).value which is basically the input in the text field
  // TODO: im not really sure how this part works
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setToSearch(event.target.value)
  }

  let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(toSearch.toLowerCase()))

  return (
    <div>
      <Notification message={message}></Notification>
      <div>
        <h2>Search</h2>
        enter name:<input value={toSearch} onChange={handleSearchChange}></input>
      </div>
      <h2>Add new contact</h2>
      {/* calls the addPerson callback upon submission */}
      <form onSubmit={addPerson}>
        <div>
          {/* a text input that sets its value to newName and has handleNameChange callback
          upon change of newName */}
          name:<input value={newName} onChange={handleNameChange}></input>
          <br></br>
          number:<input value={newNumber} onChange={handleNumberChange}></input>
          <br></br>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <Persons persons={filteredPersons}></Persons>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)