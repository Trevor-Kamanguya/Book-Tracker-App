import { useNavigate } from 'react-router-dom'
import BookForm from '../components/BookForm'

function AddBookPage() {
  const navigate = useNavigate()

  function handleAdded() {
    navigate('/')
  }

  return (
    <div className="add-book-page">
      <BookForm onSubmit={handleAdded} />
    </div>
  )
}

export default AddBookPage
