import BookForm from "../components/BookForm";
import "./AddBook.css";

function AddBook({ addBook }) {
  return (
    <div className="add-book-page">
      <BookForm addBook={addBook} />
    </div>
  );
}

export default AddBook;