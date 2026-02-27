import axios from 'axios'
import { supabase } from './supabase'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

// function to add tokens automatically to all endpoint call
api.interceptors.request.use(
    async(config) => {
    const {data} = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},
(error) => {
        return Promise.reject(error)
    }
)

// Optional: global error handling
api.interceptors.response.use(
  (response) => response,
  async(error) => {
    // You can show toast here or handle 401 → logout
    if (error.response?.status === 401) {
      await supabase.auth.signOut()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const sync_user_data = () => api.post('/api/v1/auth/sync-user')
export const getDashboardSummary = () => api.get('/api/v1/dashboard/summary')
export const profile = () => api.get('api/v1/auth/me')
export const updateProfile = () => api.patch('api/v1/auth/me')
