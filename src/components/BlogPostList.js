import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPostList.css';  

const BlogPostList = ({ posts }) => {
  if (posts.length === 0) {
    return <p className="alert alert-warning">No posts found.</p>;
  }

  return (
    <div className="blog-post-list row">
      {posts.map((post) => (
        <div key={post._id} className="col-md-4 mb-4">
          <div className="card border-info shadow-sm">
            <img src={post.image} alt={post.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title text-primary">{post.title}</h5>
              <p className="card-text">{post.content.substring(0, 30)}...</p>
              <p className="text-secondary">Author: {post.author.name}</p>
              <p className="text-muted">Published on: {new Date(post.ctime).toLocaleDateString('en-GB')}</p>
              <Link to={`/post/${post._id}`} className="btn btn-info">Read More</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostList;
