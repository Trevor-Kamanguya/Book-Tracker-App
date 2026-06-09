import { useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BooksContext'
import BookForm from '../components/BookForm'

function AddBookPage() {
  const navigate = useNavigate()
  const { addBook } = useBooks()

  function handleAdded(savedBook) {
    addBook(savedBook)
    navigate('/')
  }

  return (
    <div className="add-book-page">
      <BookForm onSubmit={handleAdded} />
    </div>
  )
}

export default AddBookPage
