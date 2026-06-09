import BookCard from './BookCard'
import { useBooks } from '../context/BooksContext'

function BookList({ searchQuery = '' }) {
  const { filteredBooks, loading, error, deleteBook } = useBooks()

  if (loading) return <p className="loading-message">Loading books...</p>
  if (error) return <p className="error-message">Error: {error}</p>

  const visible = filteredBooks.filter(book => {
    const q = searchQuery.toLowerCase()
    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
    )
  })

  if (visible.length === 0) return <p className="empty-message">No books found.</p>

  return (
    <div className="book-list">
      {visible.map(book => (
        <BookCard key={book.id} book={book} onDelete={deleteBook} />
      ))}
    </div>
  )
}

export default BookList
