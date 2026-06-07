// Member 2: Implement this component
// - Fetch books from API (replace useBooks with your fetch logic)
// - Handle loading and error states
// - Display books using .map() via BookCard
import { useBooks } from '../context/BooksContext'
import BookCard from './BookCard'

function BookList() {
  const { filteredBooks } = useBooks()

  if (filteredBooks.length === 0) {
    return <p className="empty-message">No books found.</p>
  }

  return (
    <div className="book-list">
      {filteredBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookList
