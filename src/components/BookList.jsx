import { useState, useEffect } from 'react'
import BookCard from './BookCard'

function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:6001/books")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch books")
        }
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

  if (loading) {
    return <p className="loading-message">Loading books...</p>
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>
  }

  if (books.length === 0) {
    return <p className="empty-message">No books found.</p>
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookList