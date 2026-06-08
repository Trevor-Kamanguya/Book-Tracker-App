import { Link } from 'react-router-dom'
import BookDetails from '../components/BookDetails'

function BookDetailsPage() {
  return (
    <div className="book-details-page">
      <Link to="/" className="back-link">&larr; Back to Books</Link>
      <BookDetails />
    </div>
  )
}

export default BookDetailsPage
