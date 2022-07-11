import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3018/api' : '',
  withCredentials: true,
})

export default instance
