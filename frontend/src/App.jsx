import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AddSweet from './pages/AddSweet'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const admin = localStorage.getItem('isAdmin') === 'true'
    
    if (token) {
      setIsAuthenticated(true)
      setIsAdmin(admin)
    }
  }, [])

  const handleLogin = (token, admin) => {
    localStorage.setItem('token', token)
    localStorage.setItem('isAdmin', admin)
    setIsAuthenticated(true)
    setIsAdmin(admin)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/" /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/" /> : 
            <Register onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Home isAdmin={isAdmin} onLogout={handleLogout} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/add-sweet" 
          element={
            isAuthenticated ? 
            <AddSweet isAdmin={isAdmin} /> : 
            <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  )
}

export default App