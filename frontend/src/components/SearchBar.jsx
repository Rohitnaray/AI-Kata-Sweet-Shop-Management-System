import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    onSearch({
      keyword,
      category,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null
    })
  }

  const handleReset = () => {
    setKeyword('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    onSearch({})
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search sweets..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="search-input"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="search-select"
      >
        <option value="">All Categories</option>
        <option value="Chocolate">Chocolate</option>
        <option value="Candy">Candy</option>
        <option value="Gummies">Gummies</option>
        <option value="Lollipop">Lollipop</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="price-input"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="price-input"
      />

      <button onClick={handleSearch} className="btn-search">Search</button>
      <button onClick={handleReset} className="btn-reset">Reset</button>
    </div>
  )
}

export default SearchBar