import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

async function getAll() {
  return (await axios.get(url)).data;
}

async function create(anecdote) {
  return (await axios.post(url, anecdote)).data
}

export { getAll, create }