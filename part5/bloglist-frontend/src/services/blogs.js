import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  return (await axios.get(baseUrl)).data
}

export default { getAll }