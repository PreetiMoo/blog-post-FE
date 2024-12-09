import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchForm.css';

const SearchForm = ({ setFilters, clearFilters }) => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/authors`);
        setAuthorList(response.data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    
    setFilters((prev) => ({ ...prev, date }));
  }, [date]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, author }));
  }, [author]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, query }));
  };

const clearFiltersFn = (e) => {
 setAuthor('')
 setQuery('')
 setDate('')
 clearFilters()
}

  return (
    <form className="search-form mb-4" onSubmit={handleSearch} style={{boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}}>
      <div className="form-row align-items-center">
        <div className="col-md-3 mb-2">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-3 mb-2">
          <label htmlFor="author">Author:</label>
          <select
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
          >
            <option value="">Select Author</option>
            {authorList.map((auth) => (
              <option key={auth._id} value={auth.name}>
                {auth.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Search by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-2 mb-2">
          <button type="submit" className="btn btn-info w-100">Search</button>
        </div>

        <button onClick={clearFiltersFn} className="btn btn-danger mb-3">
                Clear Filters
              </button>
      </div>
    </form>
  );
};

export default SearchForm;
