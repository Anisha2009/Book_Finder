import { useState } from "react";
import BookList from "./component/BookList";
import { FaBook } from "react-icons/fa";
import "./app.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();

      if (data.docs.length === 0) {
        setError("No books found!");
      } else {
        setBooks(data.docs.slice(0, 20));
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchBooks();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">
  <FaBook className="book-icon" /> Book Finder
</h1>

      {/* Input and Button on same line */}
      <div className="search-container">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Serach your Book Here :)"
            className="search-input"
          />
        </div>
        <button onClick={searchBooks} className="search-button">
          Search
        </button>
      </div>

      {loading && <p className="status-text">🔎 Searching for books...</p>}
      {error && <p className="status-text" style={{ color: "red" }}>{error}</p>}
      {!loading && !error && books.length === 0 && (
        <p className="status-text">Start searching for books to see results 📖</p>
      )}

      <BookList books={books} />
    </div>
  );
}
