import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3018',
  withCredentials: true,
})

export default instance
