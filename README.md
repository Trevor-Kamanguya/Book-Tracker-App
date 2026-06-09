# Book Tracker App

A full-stack book tracking web app built with React 19 + Vite on the frontend and json-server as the REST API backend. Track every book on your shelf — what you are reading, what you want to read, and what you have finished.

---

## Features

- View all your books in a responsive card grid
- Filter books by status: All / Want to Read / Currently Reading / Completed
- Search books by title or author in real time
- View full book details: cover image, description, genre, status badge
- Update a book's reading status directly from the details page
- Add a new book via a validated form (title, author, genre, status, cover image, description)
- Delete any book from the card list or the details page
- All changes persist to the JSON database — no data lost on refresh

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router v7 |
| State | React Context API (`useBooks` hook) |
| Backend | json-server 1.x (REST API) |
| Styling | Plain CSS with CSS variables |
| Language | JavaScript (ES Modules) |

---

## Prerequisites

Make sure you have these installed before running the project:

- **Node.js** v18 or higher — [https://nodejs.org](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)
- **Git** — [https://git-scm.com](https://git-scm.com)

Check your versions:
```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Trevor-Kamanguya/Book-Tracker-App.git
cd Book-Tracker-App
```

### 2. Install dependencies
```bash
npm install
```
This installs everything including json-server — no extra global installs needed.

### 3. Start the API server (Terminal 1)
```bash
npm run server
```
The JSON API will be running at: **http://localhost:6001/books**

Keep this terminal open. It watches `db.json` and all changes persist automatically.

### 4. Start the React app (Terminal 2)
```bash
npm run dev
```
Open your browser at: **http://localhost:5173**

> You need BOTH terminals running at the same time for the app to work.

---

## Available Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start the json-server API on port 6001 |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the source files |

---

## App Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Book grid with search and status filter |
| `/add` | Add Book | Form to add a new book |
| `/books/:id` | Book Details | Full details, status update, delete |

---

## API Endpoints

The backend is json-server running on port 6001.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get one book by ID |
| POST | `/books` | Add a new book |
| PATCH | `/books/:id` | Update a book field (e.g. status) |
| DELETE | `/books/:id` | Delete a book |

---

## Project Structure

```
Book-Tracker-App/
├── db.json                          # Database (20 seed books)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                     # React entry point
    ├── App.jsx                      # Router and layout
    ├── index.css                    # Global styles and CSS variables
    ├── components/
    │   ├── Navbar.jsx               # Top navigation bar
    │   ├── Footer.jsx               # Footer
    │   ├── BookList.jsx             # Renders the grid of BookCards
    │   ├── BookCard.jsx             # Single book card with delete button
    │   ├── BookDetails.jsx          # Full book detail view
    │   ├── BookDetails.css
    │   ├── BookForm.jsx             # Add-book form with validation
    │   ├── BookForm.css
    │   ├── StatusFilter.jsx         # All / Want to Read / etc. filter buttons
    │   └── StatusBadge.jsx          # Coloured status pill
    ├── pages/
    │   ├── HomePage.jsx             # Search bar + StatusFilter + BookList
    │   ├── AddBookPage.jsx          # Wraps BookForm, navigates home on success
    │   └── BookDetailsPage.jsx      # Wraps BookDetails with back link
    └── context/
        └── BooksContext.jsx         # Global state — fetches API, exposes hooks
```

---

## Shared State — useBooks Hook

Every component that needs book data imports the context hook:

```js
import { useBooks } from '../context/BooksContext'

const {
  books,          // full list from API
  filteredBooks,  // list after status filter applied
  loading,        // true while fetching
  error,          // error message string or null
  filter,         // current status filter value
  setFilter,      // change the status filter
  addBook,        // append a newly saved book to state
  updateStatus,   // PATCH status to API + update state
  deleteBook,     // DELETE from API + remove from state
} = useBooks()
```

---

## Book Data Structure

```json
{
  "id": "1",
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-development",
  "status": "Currently Reading",
  "image": "https://covers.openlibrary.org/b/id/10527843-L.jpg",
  "description": "A book about building better habits..."
}
```

**Valid status values:** `"Want to Read"` | `"Currently Reading"` | `"Completed"`

---

## Team

| Member | Role | Contributions |
|---|---|---|
| Member 1 (Abdirahim) | Integrator | Project setup, routing, Navbar, Footer, BooksContext, BookForm fix, search bar, delete, data flow fix |
| Member 2 (Trevor) | Frontend | BookList, BookCard |
| Member 3 | Forms | BookForm component |
| Member 4 | Details | BookDetails component |
| Member 5 | Filtering | StatusFilter, StatusBadge |

---

## Common Issues

**Books not loading / "Failed to load books"**
Make sure the API server is running: `npm run server`

**Port already in use**
Something else is using port 6001 or 5173. Stop the other process or change the port in `package.json` (server script) and `src/context/BooksContext.jsx`.

**Changes not saving after restart**
This is expected — json-server saves to `db.json` in real time, so changes persist as long as you do not reset the file.
