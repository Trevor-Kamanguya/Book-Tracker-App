// Member 3: Implement this component
// - Handle form inputs: title, author, genre, status, image, description
// - Validate inputs before submitting
// - Call addBook() from useBooks() context
import { useBooks } from '../context/BooksContext'

function BookForm() {
  const { addBook } = useBooks()

  return (
    <div className="book-form">
      <p className="placeholder-text">BookForm — Member 3 will implement this component.</p>
    </div>
  )
}

export default BookForm
