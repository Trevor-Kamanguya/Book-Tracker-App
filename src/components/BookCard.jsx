import { Link } from 'react-router-dom'

function BookCard({ book, onDelete }) {
  const statusClass = book.status.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="book-card">
      <img
        src={book.image || 'https://via.placeholder.com/120x180?text=No+Cover'}
        alt={book.title}
        className="book-card-image"
        onError={e => { e.target.src = 'https://via.placeholder.com/120x180?text=No+Cover' }}
      />
      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}</p>
        <p className="book-card-genre">{book.genre}</p>
        <span className={`book-card-status ${statusClass}`}>{book.status}</span>
        <div className="book-card-actions">
          <Link to={`/books/${book.id}`} className="book-card-link">View Details</Link>
          <button className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default BookCard