import { useState } from 'react'
import './BookForm.css'

function BookForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    status: 'Want to Read',
    image: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    if (!formData.title.trim() || !formData.author.trim()) {
      setErrorMessage('Title and author are required.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('http://localhost:6001/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Server error')

      const savedBook = await response.json()
      setSuccessMessage('Book added successfully!')
      setFormData({
        title: '',
        author: '',
        genre: '',
        status: 'Want to Read',
        image: '',
        description: '',
      })
      if (onSubmit) onSubmit(savedBook)
    } catch {
      setErrorMessage('Failed to add book. Make sure the server is running.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Add a New Book</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            name="genre"
            type="text"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g. Fiction, Non-fiction"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the book"
            rows={4}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  )
}

export default BookForm
