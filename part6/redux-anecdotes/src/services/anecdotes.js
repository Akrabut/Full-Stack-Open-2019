import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

async function getAll() {
  return (await axios.get(url)).data;
}

async function postAnecdote(anecdote) {
  return (await axios.post(url, anecdote)).data
}

async function updateAnecdote(anecdote) {
  return (await axios.patch(`${url}/${anecdote.id}`, { votes: anecdote.votes + 1 })).data
}

export { getAll, postAnecdote, updateAnecdote }