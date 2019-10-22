import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

function read(id='') {
  return (
    axios.get(`${baseUrl}/${id}`)
      .then(response => response.data)
      .catch(error => console.log(error))
  )
}

function create(person) {
  return (
    axios.post(baseUrl, person)
      .then(response => response.data)
      .catch(error => console.log(error))
  )
}

function patch(person) {
  console.log(person)
  return (
    axios.patch(`${baseUrl}/${person.id}`, person)
      .then(request => request.data)
      .catch(error => console.log(error))
  )
}

function destroy(id) {
  return (
    axios.delete(`${baseUrl}/${id}`)
      .then(response => console.log(`person with id = ${id} deleted`))
      .catch(error => console.log(error))
  )
}

export default {read, create, patch}
export {destroy}