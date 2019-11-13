import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const readAll = async () => {
  return (await axios.get(baseUrl)).data
}

const create = async (blog, token) => {
  return axios.post(baseUrl, blog, { headers: { Authorization: token } })
}

const update = async blog => {
  try {
    return axios.patch(`${baseUrl}/${blog.id}`, blog)
  } catch(error) { console.log(error); }
}

const deleteBlog = async (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
}

export default { readAll, create, update, deleteBlog }