import "./BookList.css";

export default function BookList({ books }) {
  if (!books || books.length === 0) return null;

  return (
    <div className="book-list">
      {books.map((book) => {
        const coverUrl = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://via.placeholder.com/200x300?text=No+Cover";

        return (
          <div key={book.key} className="book-card">
            <img src={coverUrl} alt={book.title} loading="lazy" />
            <div className="book-details">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">
                {book.author_name?.[0] || "Unknown Author"}
              </p>
              <p className="book-year">
                {book.first_publish_year
                  ? `Published: ${book.first_publish_year}`
                  : "Year unknown"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
