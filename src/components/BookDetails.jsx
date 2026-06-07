// Member 4: Implement this component
// - Use useParams() from react-router-dom to get book id
// - Find the book from context using the id
// - Display full book information: cover, title, author, genre, status, description
import { useParams } from 'react-router-dom'
import { useBooks } from '../context/BooksContext'

function BookDetails() {
  const { id } = useParams()
  const { books } = useBooks()
  const book = books.find(b => b.id === parseInt(id))

  if (!book) return <p className="empty-message">Book not found.</p>

  return (
    <div className="book-details">
      <p className="placeholder-text">BookDetails — Member 4 will implement this component.</p>
      <p>Book ID: {id} | Title: {book.title}</p>
    </div>
  )
}

export default BookDetails
