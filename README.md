# Book Tracker App

A React app to track books you are reading, want to read, or have completed.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the JSON Server (backend)
```bash
npx json-server --watch db.json --port 6001
```
Backend runs at: **http://localhost:6001/books**

### 3. Start the React app (frontend)
```bash
npm run dev
```
Frontend runs at: **http://localhost:5173**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | http://localhost:6001/books | Get all books |
| GET | http://localhost:6001/books/:id | Get a single book |
| POST | http://localhost:6001/books | Add a new book |
| PATCH | http://localhost:6001/books/:id | Update a book (e.g. status) |
| DELETE | http://localhost:6001/books/:id | Delete a book |

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Member 1
│   ├── Footer.jsx          # Member 1
│   ├── BookList.jsx        # Member 2
│   ├── BookCard.jsx        # Member 2
│   ├── BookForm.jsx        # Member 3
│   ├── BookDetails.jsx     # Member 4
│   └── StatusFilter.jsx    # Member 5
├── pages/
│   ├── HomePage.jsx
│   ├── AddBookPage.jsx
│   └── BookDetailsPage.jsx
├── context/
│   └── BooksContext.jsx    # Shared state for all members
├── App.jsx                 # Routes and layout
└── main.jsx
```

## Shared Context (useBooks hook)

All components access shared state via:
```js
import { useBooks } from '../context/BooksContext'

const { books, filteredBooks, filter, setFilter, addBook, updateStatus, deleteBook } = useBooks()
```

## Book Data Structure

```js
{
  id: 1,
  title: "Atomic Habits",
  author: "James Clear",
  genre: "Self-development",
  status: "Currently Reading",  // "Want to Read" | "Currently Reading" | "Completed"
  image: "https://...",
  description: "..."
}
```
