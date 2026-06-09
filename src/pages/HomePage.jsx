import { useState } from 'react'
import BookList from '../components/BookList'
import StatusFilter from '../components/StatusFilter'

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>My Book Collection</h1>
        <p>Track the books you are reading, want to read, or have completed.</p>
      </div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <StatusFilter />
      <BookList searchQuery={searchQuery} />
    </div>
  )
}

export default HomePage
