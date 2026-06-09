import { useState, useEffect } from 'react'
import BookCard from './BookCard'

function BookList({ searchQuery = '' }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:6001/books")
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch books")
        return response.json()
      })
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:6001/books/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete')
      setBooks(prev => prev.filter(book => book.id !== id))
    } catch {
      alert('Could not delete book. Make sure the server is running.')
    }
  }

  if (loading) return <p className="loading-message">Loading books...</p>
  if (error) return <p className="error-message">Error: {error}</p>

  const filtered = books.filter(book => {
    const q = searchQuery.toLowerCase()
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
    )
  })

  if (filtered.length === 0) {
    return <p className="empty-message">No books found.</p>
  }

  return (
    <div className="book-list">
      {filtered.map(book => (
        <BookCard key={book.id} book={book} onDelete={handleDelete} />
      ))}
    </div>
  )
}

export default BookList