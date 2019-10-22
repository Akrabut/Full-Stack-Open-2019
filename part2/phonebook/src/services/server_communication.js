import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const read = (id='') => {
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

export default {read, create}
