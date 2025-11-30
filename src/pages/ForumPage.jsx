import React, { useState } from 'react';
import { posts as initialPosts } from '../data/posts';

const ForumPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleAddPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      author: 'Current User', // Replace with actual user data
      date: new Date().toLocaleDateString(),
      content: newPostContent,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handleAddComment = (postId, e) => {
    e.preventDefault();
    const newCommentObj = {
      id: Date.now(),
      author: 'Current User', // Replace with actual user data
      date: new Date().toLocaleDateString(),
      content: newComment,
    };
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCommentObj],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setNewComment('');
  };

  return (
    <div className="forum-page content-container">
      <h1>Support Forum / Peer Group</h1>
      <div className="add-post-form">
        <h2>Create a new post</h2>
        <form onSubmit={handleAddPost}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Post title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>
              <em>
                Posted by {post.author} on {post.date}
              </em>
            </p>
            <p>{post.content}</p>
            <div className="comments-section">
              <h3>Comments</h3>
              {post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p>
                    <strong>{comment.author}:</strong> {comment.content}
                  </p>
                </div>
              ))}
              <form onSubmit={(e) => handleAddComment(post.id, e)}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
