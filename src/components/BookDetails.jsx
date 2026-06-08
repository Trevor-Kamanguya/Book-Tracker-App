
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../context/BooksContext";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    books,
    updateStatus,
    deleteBook
  } = useBooks();

  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div>
        <h2>Book not found.</h2>
        <button onClick={() => navigate("/")}>
          ← Back to all books
        </button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div>
        {book.image ? (
          <img src={book.image} alt={book.title} />
        ) : (
          <p>No Cover Available</p>
        )}

        <h1>{book.title}</h1>

        <p>by {book.author}</p>

        <p>Status: {book.status}</p>

        {/* Member 5: Update Status */}
        <div>
          <label>Update Status: </label>

          <select
            value={book.status}
            onChange={(e) =>
              updateStatus(book.id, e.target.value)
            }
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">
              Currently Reading
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>
        </div>

        <p>Genre: {book.genre}</p>

        {book.description && (
          <div>
            <h3>About this book</h3>
            <p>{book.description}</p>
          </div>
        )}

        {/* Member 5: Delete Book */}
        <button
          onClick={() => {
            deleteBook(book.id);
            navigate("/");
          }}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
}

export default BookDetails;
