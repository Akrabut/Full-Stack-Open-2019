import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
  return axios.post(baseUrl, credentials)
}

export default { login }