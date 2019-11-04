import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const readAll = async () => {
  return (await axios.get(baseUrl)).data
}

const create = async (blog, token) => {
  return axios.post(baseUrl, blog, { headers: { Authorization: token }})
}

export default { readAll, create }