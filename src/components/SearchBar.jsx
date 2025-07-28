// PropTypes definition for SearchBar
// eslint-disable-next-line react/prop-types
function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search wrestlers, schools, coaches, or tournaments..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </div>
    </form>
  );
}

export default SearchBar;