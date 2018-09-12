const envConfig = {
  development: {
    baseURL: 'http://localhost:8081/api'
  },
  production: {
    baseURL: 'http://localhost:8081/api'
  }
}
const env = process.env.NODE_ENV

export default {
  baseURL: envConfig[env]
}