import axios from 'axios'
import { supabase } from './supabase'
import type { expenseType, extraIncomeType, profileFormData, subscriptionFormType} from '../types/financial'


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

let accessToken: string | null = null

supabase.auth.onAuthStateChange((_event, session) => {
  accessToken = session?.access_token ?? null
})

// function to add tokens automatically to all endpoint call
api.interceptors.request.use((config) => {
     if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
},
(error) =>  Promise.reject(error)
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

// profile
export const profile = () => api.get('api/v1/auth/me')
export const updateProfile = (data:profileFormData) => api.patch('api/v1/auth/me', data)

// expense
export const getExpense = (page:number, limit:number) => api.get(`api/v1/expenses?page=${page}&limit=${limit}`)
export const createExpense = (data:expenseType) => api.post('api/v1/expenses', data)
export const getSingleExpense = (id:string) => api.post('api/v1/expenses', id)
export const updateExpense = (id:string, data:expenseType) => api.patch(`api/v1/expenses/${id}`, data)
export const deleteExpense = (id:string) => api.delete(`api/v1/expenses/${id}`)

// extra-income
export const getExtraIncome = () => api.get('api/v1/extra-incomes')
export const createExtraIncome = (data:extraIncomeType) => api.post('api/v1/extra-incomes', data)
export const updateExtraIncome = (id:string, data:extraIncomeType) => api.patch(`api/v1/extra-incomes/${id}`, data)
export const deleteExtraIncome = (id:string) => api.delete(`api/v1/extra-incomes/${id}`)

// subscription
export const getSubscription = () => api.get('api/v1/subscriptions')
export const createSubscription = (data:subscriptionFormType) => api.post('api/v1/subcriptions', data)
export const updateSubscription = (id:string, data:subscriptionFormType) => api.patch(`api/v1/subscriptions/${id}`, data)
export const deleteSubscription = (id:string) => api.delete(`api/v1/subscriptions/${id}`)

export default api
