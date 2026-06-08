import { createContext, useContext, useState } from 'react'

const BooksContext = createContext()

const initialBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-development",
    status: "Currently Reading",
    image: "https://covers.openlibrary.org/b/id/10527843-L.jpg",
    description: "A book about building better habits and making tiny changes that lead to remarkable results."
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    status: "Completed",
    image: "https://covers.openlibrary.org/b/id/8432086-L.jpg",
    description: "A story of the fabulously wealthy Jay Gatsby and his love for Daisy Buchanan."
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    status: "Want to Read",
    image: "https://covers.openlibrary.org/b/id/8621137-L.jpg",
    description: "A handbook of agile software craftsmanship for writing readable and maintainable code."
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    status: "Completed",
    image: "https://covers.openlibrary.org/b/id/8810494-L.jpg",
    description: "A gripping tale of racial injustice and loss of innocence in the American South."
  },
  {
    id: 5,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Programming",
    status: "Want to Read",
    image: "https://covers.openlibrary.org/b/id/8700428-L.jpg",
    description: "Timeless advice on software development from journeyman to master."
  }
]

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)
  const [filter, setFilter] = useState('All')

  function addBook(book) {
    const newBook = {
      ...book,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1
    }
    setBooks(prev => [...prev, newBook])
  }

  function updateStatus(id, status) {
    setBooks(prev =>
      prev.map(book => book.id === id ? { ...book, status } : book)
    )
  }

  function deleteBook(id) {
    setBooks(prev => prev.filter(book => book.id !== id))
  }

  const filteredBooks = filter === 'All'
    ? books
    : books.filter(book => book.status === filter)

  return (
    <BooksContext.Provider value={{ books, filteredBooks, filter, setFilter, addBook, updateStatus, deleteBook, setBooks }}>
      {children}
    </BooksContext.Provider>
  )
}

export function useBooks() {
  return useContext(BooksContext)
}
