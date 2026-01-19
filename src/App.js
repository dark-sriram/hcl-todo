import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ postname: '', description: '' });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/todo/get');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async () => {
    if (!newPost.postname.trim()) return;

    try {
      const response = await fetch('http://localhost:8080/todo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        setNewPost({ postname: '', description: '' });
        fetchPosts();
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const updatePost = async () => {
    if (!editingPost.postname.trim()) return;

    try {
      const response = await fetch(`http://localhost:8080/todo/put/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPost),
      });
      if (response.ok) {
        setEditingPost(null);
        fetchPosts();
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:8080/todo/del/${id}`, {
        method: 'DELETE',
      });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const startEditing = (post) => {
    setEditingPost({ ...post });
  };

  const cancelEditing = () => {
    setEditingPost(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>

      <div className="add-form">
        <input
          type="text"
          placeholder="Task title"
          value={newPost.postname}
          onChange={(e) => setNewPost({ ...newPost, postname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newPost.description}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
        />
        <button onClick={addPost}>Add Task</button>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            {editingPost && editingPost.id === post.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editingPost.postname}
                  onChange={(e) => setEditingPost({ ...editingPost, postname: e.target.value })}
                />
                <input
                  type="text"
                  value={editingPost.description}
                  onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                />
                <button onClick={updatePost}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div className="post-content">
                <h3>{post.postname}</h3>
                {post.description && <p>{post.description}</p>}
                <div className="post-actions">
                  <button onClick={() => startEditing(post)}>Edit</button>
                  <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
