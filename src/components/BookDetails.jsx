import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../context/BooksContext";
import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, updateStatus, deleteBook } = useBooks();
  const book = books.find((b) => String(b.id) === String(id));
  if (!book) {
    return (
      <div className="details-empty">
        <h2>Book not found.</h2>
        <button className="btn" onClick={() => navigate("/")}>← Back to all books</button>
      </div>
    );
  }
  const statusClass = book.status.toLowerCase().replace(/\s+/g, "-");
  const handleDelete = () => {
    if (window.confirm(`Remove "${book.title}" from your shelf?`)) {
      deleteBook(book.id);
      navigate("/");
    }
  };
  return (
    <div className="details">
      <div className="details-cover">
        {book.image ? <img src={book.image} alt={book.title} /> : <div className="details-cover-fallback">{book.title?.[0] || "?"}</div>}
      </div>
      <div className="details-info">
        <span className={`details-badge badge-${statusClass}`}>{book.status}</span>
        <h1 className="details-title">{book.title}</h1>
        <p className="details-author">by {book.author}</p>
        {book.genre && <p className="details-genre">{book.genre}</p>}
        {book.description && (
          <div className="details-desc"><h3>About this book</h3><p>{book.description}</p></div>
        )}
        <div className="details-actions">
          <label className="details-status-label">Update status
            <select value={book.status} onChange={(e) => updateStatus(book.id, e.target.value)}>
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <button className="btn btn-danger" onClick={handleDelete}>Delete Book</button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
