import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import SearchForm from './components/SearchForm';
import BlogPostDetail from './components/BlogPostDetail';
import './App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';

const AppContent = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({ query: '', date: '', author: '' });

  const location = useLocation();  

  const fetchFilteredPosts = async () => {
    try {
      const isFilterApplied = Object.values(filters).some((filter) => filter);

      const endpoint = isFilterApplied
        ? `${process.env.REACT_APP_API_URL}/search?${new URLSearchParams(filters).toString()}`
        : `${process.env.REACT_APP_API_URL}/posts/`;

      const response = await axios.get(endpoint);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchFilteredPosts();
  }, [filters]);

  useEffect(() => {
    fetchFilteredPosts();
  }, []);

  const clearFilters = () => {
    setFilters({ query: '', date: '', author: '' });
  };

  return (
    <div className="App container">
      {location.pathname === '/' && <h1 className="mb-4 text-color">Blog Posts</h1>}

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <SearchForm setFilters={setFilters} clearFilters={clearFilters}/>
              <BlogPostList posts={posts} />
            </>
          }
        />
        <Route path="/post/:id" element={<BlogPostDetail />} /> 
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

