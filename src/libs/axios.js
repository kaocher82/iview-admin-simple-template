import axios from 'axios'
import config from '../config'

const request = axios.create({
  baseURL: config.baseURL
})

request.interceptors.request.use((config) => {
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export function fetch (url, data, method = 'GET') {
  const payload = {}
  if (method.toUpperCase() === 'GET') payload.params = data
  else payload.data = data
  return request({
    url,
    method,
    ...payload
  }).then(res => res.data)
}