import axios from 'axios'

// Base URL of the Spring Boot backend (see backend/src/main/resources/application.properties -> server.port=8086)
const API_BASE_URL = 'http://localhost:8086/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lifeadmin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If the backend says the token is invalid/expired, clear local auth state
// and send the user back to the login page.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('lifeadmin_token')
      localStorage.removeItem('lifeadmin_user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// ---------- Auth ----------
export const registerUser = (payload) => api.post('/auth/register', payload)
export const loginUser = (payload) => api.post('/auth/login', payload)

// ---------- Items ----------
export const fetchItems = (params) => api.get('/items', { params })
export const fetchItem = (id) => api.get(`/items/${id}`)
export const createItem = (payload) => api.post('/items', payload)
export const updateItem = (id, payload) => api.put(`/items/${id}`, payload)
export const deleteItem = (id) => api.delete(`/items/${id}`)

// ---------- Dashboard ----------
export const fetchDashboard = () => api.get('/dashboard')

export default api
