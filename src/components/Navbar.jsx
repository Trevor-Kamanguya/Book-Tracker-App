import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Book Tracker</Link>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          + Add Book
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
