import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './BlogPostDetail.css';  
import { ArrowLeft } from 'react-bootstrap-icons';

const BlogPostDetail = () => {
  const { id } = useParams();  
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`);
        setPost(response.data); 
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch the post.');
      }
    };
    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div className="blog-post-detail container mt-4-padding">
      <button
        onClick={() => navigate(-1)} 
        className="btn btn-secondary-blue mb-2 d-flex align-items-center"
        aria-label="Go Back"
      >
        <ArrowLeft className="mr-2" size={21} color='white'/>
      </button>

<div className="col-12">
          <h2 className="mb-4 text-primary">{post.title}</h2> 
        </div>


      <div className="row">
        <div className="col-12">
          <img
            src={post.image}
            alt={post.title}
            className="img-fluid mb-4 border border-primary"
          />
        </div>

        <div className="col-12">
  {post.content ? (
    post.content.split('\n').map((line, index) => (
      <p key={index} className="text-muted">{line}</p>
    ))
  ) : (
    <p>Loading content...</p>
  )}
</div>

        <div className="col-12">
          <p className="font-weight-bold text-color"><strong>Author:</strong> {post.author.name}</p> 
          <p className="text-secondary"><strong>Published on:</strong> {new Date(post.ctime).toLocaleDateString('en-GB')}</p> 
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
