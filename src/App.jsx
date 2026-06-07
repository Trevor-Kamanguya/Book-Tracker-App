import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BooksProvider } from './context/BooksContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AddBookPage from './pages/AddBookPage'
import BookDetailsPage from './pages/BookDetailsPage'
import './index.css'

function App() {
  return (
    <BooksProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddBookPage />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </BooksProvider>
  )
}

export default App
