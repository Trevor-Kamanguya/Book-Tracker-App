import BookList from '../components/BookList'
import StatusFilter from '../components/StatusFilter'

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-header">
        <h1>My Book Collection</h1>
        <p>Track the books you are reading, want to read, or have completed.</p>
      </div>
      <StatusFilter />
      <BookList />
    </div>
  )
}

export default HomePage
