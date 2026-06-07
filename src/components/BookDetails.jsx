import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BookContext } from "../context/BookContext";

const statusColors = {
  "Want to Read": { bg: "#EEF2FF", color: "#4338CA" },
  "Currently Reading": { bg: "#FFF7ED", color: "#C2410C" },
  Completed: { bg: "#F0FDF4", color: "#15803D" },
};

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useContext(BookContext);

  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return (
      <div style={styles.notFound}>
        <h2 style={{ marginBottom: "1rem" }}>Book not found.</h2>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ← Back to all books
        </button>
      </div>
    );
  }

  const statusStyle = statusColors[book.status] || {
    bg: "#F3F4F6",
    color: "#374151",
  };

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div style={styles.card}>
        {/* Left: Cover Image */}
        <div style={styles.imageWrapper}>
          {book.image ? (
            <img src={book.image} alt={book.title} style={styles.image} />
          ) : (
            <div style={styles.imagePlaceholder}>
              <span style={styles.placeholderText}>No Cover</span>
            </div>
          )}
        </div>

        {/* Right: Book Info */}
        <div style={styles.info}>
          <h1 style={styles.title}>{book.title}</h1>
          <p style={styles.author}>by {book.author}</p>

          {/* Status Badge */}
          <span
            style={{
              ...styles.statusBadge,
              backgroundColor: statusStyle.bg,
              color: statusStyle.color,
            }}
          >
            {book.status}
          </span>

          {/* Genre */}
          <div style={styles.metaRow}>
            <div style={styles.metaItem}>
              <span style={styles.metaLabel}>Genre</span>
              <span style={styles.metaValue}>{book.genre}</span>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div style={styles.descriptionBlock}>
              <h3 style={styles.descLabel}>About this book</h3>
              <p style={styles.description}>{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
  },
  backBtn: {
    background: "none",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "1.5rem",
    display: "inline-block",
  },
  card: {
    display: "flex",
    gap: "2rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
    padding: "2rem",
    flexWrap: "wrap",
  },
  imageWrapper: {
    flexShrink: 0,
  },
  image: {
    width: "180px",
    height: "260px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #E5E7EB",
  },
  imagePlaceholder: {
    width: "180px",
    height: "260px",
    backgroundColor: "#F3F4F6",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E5E7EB",
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: "14px",
  },
  info: {
    flex: 1,
    minWidth: "220px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 6px",
  },
  author: {
    fontSize: "16px",
    color: "#6B7280",
    margin: "0 0 16px",
  },
  statusBadge: {
    display: "inline-block",
    padding: "5px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "1.5rem",
  },
  metaRow: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  metaLabel: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9CA3AF",
    fontWeight: "500",
  },
  metaValue: {
    fontSize: "15px",
    color: "#374151",
    fontWeight: "500",
  },
  descriptionBlock: {
    borderTop: "1px solid #F3F4F6",
    paddingTop: "1.25rem",
  },
  descLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "8px",
  },
  description: {
    fontSize: "15px",
    color: "#4B5563",
    lineHeight: "1.7",
    margin: 0,
  },
  notFound: {
    textAlign: "center",
    padding: "4rem 2rem",
    color: "#374151",
  },
};

export default BookDetails;
