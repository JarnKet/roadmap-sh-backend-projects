# Personal Blog - Node.js Backend Project

A simple, elegant personal blog application built with Node.js, Express, and EJS. This project demonstrates modern backend development practices and serves as an excellent learning resource for beginners wanting to understand web application development.

## 🌟 Features

### Public Features

-   **Responsive Design**: Mobile-first, modern UI that works on all devices
-   **Article Browsing**: View all published articles with beautiful typography
-   **Individual Article Pages**: Clean, readable article layout
-   **Chronological Sorting**: Articles automatically sorted by publish date

### Admin Features

-   **Secure Authentication**: Password-protected admin access
-   **Article Management**: Create, read, update, and delete articles
-   **Rich Editor**: User-friendly forms with validation and auto-save
-   **Dashboard**: Overview of all articles with management actions
-   **Session Management**: Secure session handling with automatic logout

### Technical Features

-   **RESTful API**: Proper HTTP methods (GET, POST, PUT, DELETE)
-   **Input Validation**: Server-side validation using express-validator
-   **Error Handling**: Comprehensive error handling with user-friendly messages
-   **Security**: Protected routes, session security, and CSRF protection
-   **Responsive UI**: Modern CSS with dark mode support
-   **File-based Storage**: Simple JSON file storage (easily replaceable with database)

## 🚀 Getting Started

### Prerequisites

-   **Node.js**: Version 16 or higher
-   **npm**: Version 8 or higher

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/personal-blog.git
    cd personal-blog
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Admin Access

-   **URL**: `http://localhost:3000/admin`
-   **Password**: `ADMIN` (for demonstration purposes)

## 📁 Project Structure

```
personal-blog/
├── controllers/           # Business logic controllers
│   ├── admin.controller.js    # Admin authentication and dashboard
│   └── article.controller.js  # Article CRUD operations
├── data/                 # Data storage
│   └── articles.json         # JSON file storing articles
├── middlewares/          # Custom middleware
│   └── auth.middleware.js    # Authentication and authorization
├── public/              # Static assets
│   └── css/
│       └── styles.css       # Main stylesheet
├── routes/              # Route definitions
│   ├── admin.route.js       # Admin routes
│   └── article.route.js     # Article routes
├── services/            # Business logic services
│   └── article.service.js   # Article data operations
├── views/               # EJS templates
│   ├── admin/              # Admin templates
│   │   ├── edit.ejs           # Edit article form
│   │   ├── index.ejs          # Admin dashboard
│   │   └── new.ejs            # New article form
│   ├── article.ejs          # Single article view
│   ├── error.ejs            # Error page template
│   ├── home.ejs             # Homepage
│   └── layout.ejs           # Base layout (unused but available)
├── index.js             # Main application file
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🛠 Technical Implementation

### Architecture Patterns

#### MVC (Model-View-Controller)

-   **Models**: Data handling in `services/` directory
-   **Views**: EJS templates in `views/` directory
-   **Controllers**: Business logic in `controllers/` directory

#### Service Layer Pattern

-   **ArticleService**: Encapsulates all article data operations
-   **Separation of Concerns**: Controllers focus on HTTP handling, services handle business logic

#### Middleware Pattern

-   **Authentication**: `auth.middleware.js` handles authorization
-   **Validation**: `express-validator` for input validation
-   **Error Handling**: Global error handling middleware

### Key Technologies

#### Backend Framework

-   **Express.js**: Fast, unopinionated web framework
-   **EJS**: Embedded JavaScript templating engine
-   **express-session**: Session management
-   **express-validator**: Input validation and sanitization

#### Development Tools

-   **Nodemon**: Auto-restart during development
-   **Method Override**: Support for PUT/DELETE in forms

### Security Features

#### Authentication

```javascript
// Session-based authentication
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
);
```

#### Authorization Middleware

```javascript
async function authorize(req, res, next) {
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.status(403).render("error", {
            title: "Access Denied",
            message: "Administrator access required",
        });
    }
}
```

#### Input Validation

```javascript
const articleValidation = [
    body("title")
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage("Title must be 3-200 characters"),
    body("content")
        .trim()
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters"),
];
```

### Error Handling

#### Global Error Handler

```javascript
app.use((error, req, res, next) => {
    console.error("Unhandled error:", error);
    res.status(error.status || 500).render("error", {
        title: "Something went wrong",
        message:
            process.env.NODE_ENV === "production"
                ? "An unexpected error occurred."
                : error.message,
    });
});
```

#### Async Error Handling

```javascript
async function getArticleById(req, res) {
    try {
        const article = await articleService.getArticleById(id);
        if (!article) {
            return res.status(404).render("error", {
                title: "Article Not Found",
            });
        }
        res.render("article", { article });
    } catch (error) {
        console.error("Error loading article:", error);
        res.status(500).render("error", {
            title: "Error",
            message: "Unable to load article",
        });
    }
}
```

## 🎨 UI/UX Design

### Design Principles

-   **Mobile-First**: Responsive design starting with mobile devices
-   **Accessibility**: Semantic HTML, proper contrast ratios, keyboard navigation
-   **Typography**: Readable fonts with proper spacing and hierarchy
-   **Visual Hierarchy**: Clear distinction between headers, content, and actions

### CSS Architecture

-   **Custom CSS**: No external frameworks for better learning
-   **CSS Grid & Flexbox**: Modern layout techniques
-   **CSS Variables**: Consistent color scheme and spacing
-   **Media Queries**: Responsive breakpoints for different screen sizes

### Interactive Elements

-   **Form Validation**: Real-time validation feedback
-   **Character Counters**: Live character/word counts for forms
-   **Auto-save**: Draft saving in localStorage
-   **Hover Effects**: Subtle animations for better UX

## 📚 Learning Objectives

This project teaches several important backend development concepts:

### 1. **RESTful API Design**

```
GET    /articles         # List all articles
GET    /articles/:id     # Get specific article
POST   /articles         # Create new article
PUT    /articles/:id     # Update article
DELETE /articles/:id     # Delete article
```

### 2. **Authentication & Authorization**

-   Session-based authentication
-   Protected routes
-   Middleware implementation
-   Security best practices

### 3. **Data Validation**

-   Server-side validation
-   Input sanitization
-   Error message handling
-   Form data processing

### 4. **Error Handling**

-   Try-catch blocks
-   Global error handlers
-   User-friendly error pages
-   Logging and debugging

### 5. **Template Engines**

-   EJS syntax and features
-   Data passing to templates
-   Partial templates
-   Dynamic content rendering

### 6. **File System Operations**

-   Reading/writing JSON files
-   Async file operations
-   Error handling for file operations
-   Data persistence

## 🔧 API Endpoints

### Public Routes

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| GET    | `/`             | Redirects to home page |
| GET    | `/home`         | Lists all articles     |
| GET    | `/articles/:id` | View single article    |

### Admin Routes

| Method | Endpoint             | Description           | Auth Required |
| ------ | -------------------- | --------------------- | ------------- |
| GET    | `/admin`             | Admin dashboard/login | No            |
| POST   | `/admin/login`       | Admin login           | No            |
| POST   | `/admin/logout`      | Admin logout          | Yes           |
| GET    | `/articles/new`      | New article form      | Yes           |
| GET    | `/articles/:id/edit` | Edit article form     | Yes           |
| POST   | `/articles`          | Create article        | Yes           |
| PUT    | `/articles/:id`      | Update article        | Yes           |
| DELETE | `/articles/:id`      | Delete article        | Yes           |

## 🚀 Deployment

### Environment Variables

Create a `.env` file for production:

```env
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-strong-secret-key-here
ADMIN_PASSPHRASE=your-admin-password
```

### Production Considerations

1. **Database**: Replace JSON file storage with a proper database
2. **Authentication**: Implement proper user management with bcrypt
3. **File Uploads**: Add image upload functionality
4. **Caching**: Implement Redis for session storage
5. **Logging**: Add proper logging with Winston
6. **SSL**: Enable HTTPS in production
7. **Process Management**: Use PM2 for process management

### Deployment Platforms

-   **Heroku**: Easy deployment with git
-   **DigitalOcean**: VPS deployment
-   **Vercel**: Serverless deployment
-   **Railway**: Simple deployment platform

## 🧪 Testing

### Manual Testing Checklist

-   [ ] Home page loads with articles
-   [ ] Individual articles are viewable
-   [ ] Admin login works
-   [ ] Admin can create articles
-   [ ] Admin can edit articles
-   [ ] Admin can delete articles
-   [ ] Form validation works
-   [ ] Error pages display correctly
-   [ ] Responsive design works on mobile

### Automated Testing (Future Enhancement)

Consider adding:

-   **Jest**: Unit testing framework
-   **Supertest**: HTTP assertion testing
-   **Cypress**: End-to-end testing

## 🤝 Contributing

This project is designed for learning. Here are ways to extend it:

### Beginner Enhancements

1. **Add article categories/tags**
2. **Implement search functionality**
3. **Add article excerpt field**
4. **Create an about page**
5. **Add article word count display**

### Intermediate Enhancements

1. **Replace JSON storage with SQLite**
2. **Add image upload for articles**
3. **Implement article drafts**
4. **Add user comments system**
5. **Create RSS feed**

### Advanced Enhancements

1. **Multi-user support with roles**
2. **RESTful API with authentication**
3. **Frontend SPA with React/Vue**
4. **Real-time editing with Socket.io**
5. **Full-text search with Elasticsearch**

## 📖 Best Practices Demonstrated

### 1. **Code Organization**

-   Separation of concerns
-   Modular file structure
-   Clear naming conventions
-   Consistent code style

### 2. **Security**

-   Input validation and sanitization
-   Session security configuration
-   CSRF protection considerations
-   Environment variable usage

### 3. **Error Handling**

-   Comprehensive try-catch blocks
-   User-friendly error messages
-   Proper HTTP status codes
-   Development vs production error display

### 4. **Performance**

-   Efficient file operations
-   Minimal database queries
-   Static asset serving
-   Response compression ready

### 5. **User Experience**

-   Responsive design
-   Form validation feedback
-   Loading states consideration
-   Intuitive navigation

## 📝 Common Issues & Solutions

### Issue: "Cannot find module 'express-validator'"

**Solution**: Run `npm install` to install all dependencies

### Issue: Articles not saving

**Solution**: Check if `data/` directory exists and has write permissions

### Issue: Session not persisting

**Solution**: Ensure cookies are enabled in browser and session secret is set

### Issue: CSS not loading

**Solution**: Verify static file middleware is configured: `app.use('/public', express.static('public'))`

### Issue: Form submission not working

**Solution**: Check form action URLs and method override middleware

## 📚 Learning Resources

### Node.js & Express

-   [Express.js Official Documentation](https://expressjs.com/)
-   [Node.js Official Documentation](https://nodejs.org/docs/)
-   [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

### EJS Templates

-   [EJS Official Documentation](https://ejs.co/)
-   [Template Engine Comparison](https://expressjs.com/en/guide/using-template-engines.html)

### Security

-   [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
-   [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### CSS & Design

-   [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
-   [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

-   Built as part of the [roadmap.sh Backend Projects](https://roadmap.sh/projects)
-   Inspired by modern web development best practices
-   Designed for educational purposes and learning

---

**Happy Coding! 🚀**

_This project demonstrates fundamental backend development concepts in a practical, real-world application. Feel free to experiment, break things, and learn from the experience!_
