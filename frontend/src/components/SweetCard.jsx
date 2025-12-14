import { useState } from 'react'
import './SweetCard.css'

function SweetCard({ sweet, isAdmin, onPurchase, onDelete }) {
  const [quantity, setQuantity] = useState(1)

  const handlePurchase = () => {
    if (quantity > 0 && quantity <= sweet.quantity) {
      onPurchase(sweet.id, quantity)
    }
  }

  return (
    <div className="sweet-card">
      <div className="sweet-header">
        <h3>{sweet.name}</h3>
        <span className="sweet-category">{sweet.category}</span>
      </div>

      <div className="sweet-details">
        <p className="sweet-price">₹{sweet.price.toFixed(1)}</p>
        <p className="sweet-quantity">
          Stock: <span className={sweet.quantity === 0 ? 'out-of-stock' : ''}>
            {sweet.quantity}
          </span>
        </p>
        {sweet.description && (
          <p className="sweet-description">{sweet.description}</p>
        )}
      </div>

      <div className="sweet-actions">
        {sweet.quantity > 0 ? (
          <div className="purchase-section">
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="quantity-input"
            />
            <button onClick={handlePurchase} className="btn-buy">
              Buy
            </button>
          </div>
        ) : (
          <button disabled className="btn-disabled">Out of Stock</button>
        )}

        {isAdmin && (
          <button onClick={() => onDelete(sweet.id)} className="btn-delete">
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default SweetCard