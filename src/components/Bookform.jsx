import { useState } from "react";
import "./BookForm.css";

function BookForm({ onSubmit }) {
  const STATUSES = ['Want to Read', 'Currently Reading', 'Completed'];

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Want to Read");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author) {
      setErrorMessage("Please fill in at least the title and author.");
      return;
    }

    const newBook = {
      title,
      author,
      genre,
      status,
      image,
      description,
    };

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:6001/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) throw new Error("Failed to add book.");

      const savedBook = await response.json();

if (onSubmit) {
  onSubmit(savedBook);
}

setSuccessMessage(`"${title}" has been added successfully!`);
setTitle("");
setAuthor("");
setGenre("");
setStatus("Want to Read");
setImage("");
setDescription("");

    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Add a New Book</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="book-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input id="title" type="text" placeholder="e.g. Atomic Habits"
            value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input id="author" type="text" placeholder="e.g. James Clear"
            value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input id="genre" type="text" placeholder="e.g. Self-development"
            value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="status">Reading Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Cover Image URL</label>
          <input id="image" type="text" placeholder="https://example.com/cover.jpg"
            value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" placeholder="A short description of the book..."
            value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Book"}
        </button>

      </form>
    </div>
  );
}

export default BookForm;