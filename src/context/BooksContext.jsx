import { createContext, useContext, useState, useEffect } from 'react'

const BooksContext = createContext()
const API = 'http://localhost:6001/books'

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch(API)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load books')
        return r.json()
      })
      .then(data => {
        setBooks(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function addBook(savedBook) {
    setBooks(prev => [...prev, savedBook])
  }

  async function updateStatus(id, status) {
    try {
      const r = await fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!r.ok) throw new Error('Failed to update')
      setBooks(prev =>
        prev.map(b => String(b.id) === String(id) ? { ...b, status } : b)
      )
    } catch {
      alert('Could not update status. Make sure the server is running.')
    }
  }

  async function deleteBook(id) {
    try {
      const r = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!r.ok) throw new Error('Failed to delete')
      setBooks(prev => prev.filter(b => String(b.id) !== String(id)))
    } catch {
      alert('Could not delete book. Make sure the server is running.')
    }
  }

  const filteredBooks = filter === 'All'
    ? books
    : books.filter(b => b.status === filter)

  return (
    <BooksContext.Provider value={{ books, filteredBooks, loading, error, filter, setFilter, addBook, updateStatus, deleteBook }}>
      {children}
    </BooksContext.Provider>
  )
}

export function useBooks() {
  return useContext(BooksContext)
}
