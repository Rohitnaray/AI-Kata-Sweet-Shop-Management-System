import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addSweet } from '../services/api'
import './AddSweet.css'

function AddSweet() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const sweetData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      }

      await addSweet(sweetData)
      navigate('/')
    } catch (err) {
      setError(err.response?.data || 'Failed to add sweet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-sweet-container">
      <div className="add-sweet-card">
        <h2>Add New Sweet</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Candy">Candy</option>
              <option value="Gummies">Gummies</option>
              <option value="Lollipop">Lollipop</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Adding...' : 'Add Sweet'}
            </button>
            <button type="button" onClick={() => navigate('/')} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSweet