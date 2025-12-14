import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllSweets, searchSweets, deleteSweet, purchaseSweet } from '../services/api'
import SweetCard from '../components/SweetCard'
import SearchBar from '../components/SearchBar'
import './Home.css'

function Home({ isAdmin, onLogout }) {
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchSweets()
  }, [])

  const fetchSweets = async () => {
    try {
      const data = await getAllSweets()
      setSweets(data)
    } catch (err) {
      setError('Failed to fetch sweets')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchParams) => {
    setLoading(true)
    try {
      const data = await searchSweets(
        searchParams.keyword,
        searchParams.category,
        searchParams.minPrice,
        searchParams.maxPrice
      )
      setSweets(data)
    } catch (err) {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async (id, quantity) => {
    try {
      await purchaseSweet(id, quantity)
      fetchSweets() // Refresh list
    } catch (err) {
      alert(err.response?.data || 'Purchase failed')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await deleteSweet(id)
        fetchSweets() // Refresh list
      } catch (err) {
        alert('Failed to delete sweet')
      }
    }
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🍬 Sweet Shop</h1>
        <div className="header-actions">
          {isAdmin && (
            <button onClick={() => navigate('/add-sweet')} className="btn-add">
              Add Sweet
            </button>
          )}
          <button onClick={onLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading">Loading sweets...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="sweets-grid">
        {sweets.map(sweet => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            isAdmin={isAdmin}
            onPurchase={handlePurchase}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {sweets.length === 0 && !loading && (
        <div className="no-sweets">No sweets found</div>
      )}
    </div>
  )
}

export default Home
