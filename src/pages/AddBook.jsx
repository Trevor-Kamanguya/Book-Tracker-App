import BookForm from "../components/BookForm";
import "./AddBook.css";

function AddBook({ onSubmit }) {
  return (
    <div className="add-book-page">
      <BookForm onSubmit={onSubmit} />
    </div>
  );
}

export default AddBook;