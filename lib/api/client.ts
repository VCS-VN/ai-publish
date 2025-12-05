import axios from 'axios'

// Check if Monmi OAuth is integrated by checking for CUSTOMER_API env variable
const hasMonmiOAuth = !!process.env.CUSTOMER_API

export const apiClient = axios.create({
  baseURL: process.env.CUSTOMER_API || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token here if available
    // const token = getAuthToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export { hasMonmiOAuth }
