import { useBooks } from '../context/BooksContext'
import './StatusBadge.css'

const STATUS_OPTIONS = ['Want to Read', 'Currently Reading', 'Completed']

function StatusBadge({ book }) {
  const { updateStatus, deleteBook } = useBooks()

  return (
    <div className="status-badge">
      <select
        className="status-select"
        value={book.status}
        onChange={(e) => updateStatus(book.id, e.target.value)}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
        className="delete-btn"
        onClick={() => {
          if (window.confirm(`Remove "${book.title}"?`)) {
            deleteBook(book.id)
          }
        }}
      >
        🗑️ Delete
      </button>
    </div>
  )
}

export default StatusBadge