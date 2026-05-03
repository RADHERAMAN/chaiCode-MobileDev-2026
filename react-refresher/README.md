# 📝 WriteBlogs - Blog Platform

A modern, full-featured blog platform built with React and Vite. Users can create accounts, write blogs, and interact with the community through likes and comments.

## 🎯 Features

### 🔐 Authentication
- **Sign Up** - Create a new account with username, email, and password
- **Login** - Secure login with email and password
- **User Profile** - View your blog statistics and published blogs

### 📚 Blog Management
- **Create Blogs** - Write and publish blogs with title, content, and category
- **Browse Blogs** - Discover all published blogs in a responsive grid layout
- **Search & Sort** - Sort blogs by most recent or most popular (likes)
- **View Details** - Read full blog content with author information
- **Like System** - Upvote blogs you love

### 👥 User Dashboard
- **My Profile** - View total blogs written and total likes received
- **Blog Statistics** - See engagement metrics for your content
- **My Blogs** - List and manage all your published blogs

### 🎨 Categories
- Technology
- Lifestyle
- Travel
- Education
- Health
- Other

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/writeBlogs.git
cd writeBlogs

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 💾 Data Storage

This application uses **localStorage** for data persistence:
- User accounts are stored securely
- All blogs and interactions are saved locally
- Data persists between sessions

*Note: For production use, consider integrating a backend database.*

## 📁 Project Structure

```
writeBlogs/
├── src/
│   ├── App.jsx          # Main app component with all features
│   ├── App.css          # Styling for the entire application
│   ├── H1.jsx           # Header component
│   ├── main.jsx         # React DOM rendering
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and development server
- **CSS3** - Styling with gradients and animations
- **localStorage** - Client-side data storage
- **JavaScript (ES6+)** - Modern JavaScript

## 🎨 Design Features

- **Responsive Layout** - Works seamlessly on desktop and mobile
- **Gradient Theme** - Beautiful purple/blue gradient design
- **Smooth Animations** - Hover effects and transitions
- **Professional UI** - Clean and intuitive user interface
- **Accessibility** - Semantic HTML and keyboard navigation

## 📖 Usage Guide

### Creating an Account
1. Click **Sign Up** on the login page
2. Enter your username, email, and password
3. Click **Sign Up** to create your account

### Writing a Blog
1. Click **Write Blog** in the navigation
2. Enter your blog title and content
3. Select a category
4. Click **Publish Blog**

### Reading Blogs
1. Go to **Home** page
2. Browse all published blogs
3. Click any blog card to read the full content
4. Like blogs you enjoy

### Viewing Your Profile
1. Click **My Profile** in the navigation
2. View your statistics and published blogs

## 🔒 Security Notes

- Passwords are stored in localStorage for demo purposes
- For production, use secure authentication (OAuth, JWT, etc.)
- Implement backend API for data persistence
- Use HTTPS in production

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**RadherAman**

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📧 Contact

For questions or feedback, please reach out through GitHub issues.

---

**Happy Blogging! 🎉**
