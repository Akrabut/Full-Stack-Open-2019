import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const readAll = async () => {
  return (await axios.get(baseUrl)).data
}

const create = async (blog, token) => {
  return axios.post(baseUrl, blog, { headers: { Authorization: token }})
}

const update = async blog => {
  try {
    blog.likes += 1
    return axios.patch(`${baseUrl}/${blog.id}`, blog)
  } catch(error) { console.log(error); }

}

export default { readAll, create, update }