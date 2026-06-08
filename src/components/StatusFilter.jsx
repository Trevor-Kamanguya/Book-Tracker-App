import { useBooks } from '../context/BooksContext'

const STATUSES = ['All', 'Want to Read', 'Currently Reading', 'Completed']

function StatusFilter() {
  const { filter, setFilter } = useBooks()

  return (
    <div className="status-filter">
      {STATUSES.map(status => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={`filter-btn ${filter === status ? 'active' : ''}`}
        >
          {status}
        </button>
      ))}
    </div>
  )
}

export default StatusFilter
