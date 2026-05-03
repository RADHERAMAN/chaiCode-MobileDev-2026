import { useState, useEffect } from 'react';
import './App.css';

// Components
function LoginSignup({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        onAuthSuccess();
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!username || !email || !password) {
        setError('All fields are required');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.email === email)) {
        setError('Email already exists');
        return;
      }

      const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        createdAt: new Date().toLocaleDateString(),
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      onAuthSuccess();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>📝 BlogHub</h1>
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-btn"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

function Header({ user, onLogout, onViewChange, currentView }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={() => onViewChange('home')}>📝 BlogHub</h1>
        <nav className="nav">
          <button 
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onViewChange('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${currentView === 'create' ? 'active' : ''}`}
            onClick={() => onViewChange('create')}
          >
            Write Blog
          </button>
          <button 
            className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
            onClick={() => onViewChange('profile')}
          >
            My Profile
          </button>
          <span className="user-info">👤 {user.username}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </nav>
      </div>
    </header>
  );
}

function Home({ onViewChange, blogs, onSelectBlog }) {
  const [sortBy, setSortBy] = useState('recent');

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return b.likes - a.likes;
  });

  return (
    <div className="home-container">
      <div className="hero">
        <h2>Welcome to BlogHub</h2>
        <p>Discover amazing stories and insights from our community</p>
        <button className="cta-btn" onClick={() => onViewChange('create')}>
          Write Your First Blog ✍️
        </button>
      </div>

      <div className="sort-container">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <div className="blogs-grid">
        {sortedBlogs.length === 0 ? (
          <p className="no-blogs">No blogs yet. Be the first to write one! ✨</p>
        ) : (
          sortedBlogs.map(blog => (
            <div 
              key={blog.id} 
              className="blog-card"
              onClick={() => onSelectBlog(blog)}
            >
              <h3>{blog.title}</h3>
              <p className="blog-author">By {blog.author}</p>
              <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
              <div className="blog-meta">
                <span className="blog-date">{blog.createdAt}</span>
                <span className="blog-likes">❤️ {blog.likes}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CreateBlog({ user, onBlogCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Technology');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      content,
      category,
      author: user.username,
      authorId: user.id,
      createdAt: new Date().toLocaleDateString(),
      likes: 0,
      comments: [],
    };

    onBlogCreate(newBlog);
    setTitle('');
    setContent('');
    setCategory('Technology');
  };

  return (
    <div className="create-blog-container">
      <h2>✍️ Create a New Blog</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="blog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input title-input"
        />

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="form-select"
        >
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea"
          rows="12"
        />

        <button type="submit" className="submit-btn">Publish Blog 📤</button>
      </form>
    </div>
  );
}

function BlogDetail({ blog, onBack, onLike }) {
  const [comment, setComment] = useState('');

  return (
    <div className="blog-detail-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      <article className="blog-article">
        <h1>{blog.title}</h1>
        <div className="blog-info">
          <span className="blog-author-info">By {blog.author}</span>
          <span className="blog-date-info">{blog.createdAt}</span>
          <span className="blog-category">{blog.category}</span>
        </div>

        <div className="blog-content">
          {blog.content}
        </div>

        <div className="blog-actions">
          <button className="like-btn" onClick={() => onLike(blog.id)}>
            ❤️ Like ({blog.likes})
          </button>
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          {blog.comments.length === 0 ? (
            <p>No comments yet. Be the first!</p>
          ) : (
            blog.comments.map((c, idx) => (
              <div key={idx} className="comment">
                <strong>{c.author}</strong>
                <p>{c.text}</p>
              </div>
            ))
          )}
        </div>
      </article>
    </div>
  );
}

function UserProfile({ user, blogs }) {
  const userBlogs = blogs.filter(b => b.authorId === user.id);
  const totalLikes = userBlogs.reduce((sum, b) => sum + b.likes, 0);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          <p>{user.email}</p>
          <p className="join-date">Joined: {user.createdAt}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <h3>{userBlogs.length}</h3>
          <p>Blogs Written</p>
        </div>
        <div className="stat">
          <h3>{totalLikes}</h3>
          <p>Total Likes</p>
        </div>
      </div>

      <div className="profile-blogs">
        <h3>Your Blogs</h3>
        {userBlogs.length === 0 ? (
          <p>You haven't written any blogs yet!</p>
        ) : (
          userBlogs.map(blog => (
            <div key={blog.id} className="profile-blog-item">
              <h4>{blog.title}</h4>
              <p>{blog.content.substring(0, 80)}...</p>
              <div className="profile-blog-meta">
                <span>{blog.createdAt}</span>
                <span>❤️ {blog.likes} likes</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    const storedBlogs = localStorage.getItem('blogs');
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleAuthSuccess = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentView('home');
  };

  const handleBlogCreate = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    setCurrentView('home');
  };

  const handleLike = (blogId) => {
    setBlogs(blogs.map(b => 
      b.id === blogId ? { ...b, likes: b.likes + 1 } : b
    ));
  };

  if (!currentUser) {
    return <LoginSignup onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="app">
      <Header 
        user={currentUser} 
        onLogout={handleLogout}
        onViewChange={setCurrentView}
        currentView={currentView}
      />

      <main className="main-content">
        {selectedBlog ? (
          <BlogDetail 
            blog={selectedBlog}
            onBack={() => setSelectedBlog(null)}
            onLike={handleLike}
          />
        ) : currentView === 'home' ? (
          <Home 
            onViewChange={setCurrentView}
            blogs={blogs}
            onSelectBlog={setSelectedBlog}
          />
        ) : currentView === 'create' ? (
          <CreateBlog 
            user={currentUser}
            onBlogCreate={handleBlogCreate}
          />
        ) : currentView === 'profile' ? (
          <UserProfile 
            user={currentUser}
            blogs={blogs}
          />
        ) : null}
      </main>
    </div>
  );
}

export default App;