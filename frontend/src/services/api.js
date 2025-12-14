import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password })
  return response.data
}

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })
  return response.data
}

export const getAllSweets = async () => {
  const response = await axios.get(`${API_URL}/sweets`)
  return response.data
}

export const searchSweets = async (keyword, category, minPrice, maxPrice) => {
  const params = {}
  if (keyword) params.keyword = keyword
  if (category) params.category = category
  if (minPrice) params.minPrice = minPrice
  if (maxPrice) params.maxPrice = maxPrice
  
  const response = await axios.get(`${API_URL}/sweets/search`, { params })
  return response.data
}

export const addSweet = async (sweet) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${API_URL}/sweets`, sweet, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const updateSweet = async (id, sweet) => {
  const token = localStorage.getItem('token')
  const response = await axios.put(`${API_URL}/sweets/${id}`, sweet, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const deleteSweet = async (id) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${API_URL}/sweets/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const purchaseSweet = async (id, quantity) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${API_URL}/sweets/${id}/purchase`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const restockSweet = async (id, quantity) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${API_URL}/sweets/${id}/restock`,
    { quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}
