# Personal Blog

A full-featured personal blogging platform built with Node.js, Express.js, and EJS templating engine. This project demonstrates modern web development practices including MVC architecture, session management, input validation, and responsive design.

## 🚀 Features

- **Public Blog Interface**: Clean, responsive design for reading articles
- **Admin Panel**: Secure administrative interface for content management
- **Article Management**: Create, read, update, and delete blog articles
- **Rich Text Content**: Support for formatted content with paragraphs and styling
- **Session-based Authentication**: Secure admin authentication system
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error handling and user feedback
- **Input Validation**: Server-side validation for all user inputs
- **JSON Data Storage**: File-based data storage for articles
- **Security Headers**: Basic security measures implemented

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **View Engine**: EJS (Embedded JavaScript)
- **Session Management**: express-session
- **Validation**: express-validator
- **Styling**: CSS3 with responsive design
- **Data Storage**: JSON files
- **Development**: Nodemon for hot reloading

## 📦 Installation

### Prerequisites

- Node.js (version 16.0.0 or higher)
- npm (version 8.0.0 or higher)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file (optional)**
   ```bash
   # Create .env file in the root directory
   touch .env
   ```

4. **Configure environment variables** (optional)
   Add the following to your `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   SESSION_SECRET=your-secret-key-here
   ADMIN_PASSPHRASE=your-admin-password-here
   ```

5. **Initialize data directory**
   ```bash
   # Create empty articles.json file if it doesn't exist
   mkdir -p data
   echo "[]" > data/articles.json
   ```

6. **Start the application**
   
   For development:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

7. **Access the application**
   - Public blog: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## 📁 Project Structure

```
personal-blog/
├── controllers/
│   ├── admin.controller.js      # Admin authentication and dashboard
│   └── article.controller.js    # Article CRUD operations
├── data/
│   └── articles.json           # JSON file storing article data
├── middlewares/
│   └── auth.middleware.js      # Authentication middleware
├── public/
│   └── css/
│       └── styles.css          # Application styles
├── routes/
│   ├── admin.route.js          # Admin routes
│   └── article.route.js        # Article routes
├── services/
│   └── article.service.js      # Article business logic
├── views/
│   ├── admin/
│   │   ├── edit.ejs           # Edit article page
│   │   ├── index.ejs          # Admin dashboard
│   │   └── new.ejs            # Create new article page
│   ├── article.ejs            # Single article view
│   ├── error.ejs              # Error page
│   ├── home.ejs               # Public home page
│   └── layout.ejs             # Base layout template
├── index.js                   # Main application file
└── package.json              # Project dependencies
```

## 🔐 Admin Access

The admin panel uses a simple passphrase authentication system. You can access the admin panel at `/admin` with:

- **Default passphrase**: `ADMIN`
- **Environment variable**: Set `ADMIN_PASSPHRASE` in your environment

> **Note**: For production use, implement proper user authentication with bcrypt password hashing and user management.

## 📝 API Endpoints

### Public Routes

- `GET /` - Redirects to home page
- `GET /home` - Display all published articles
- `GET /articles/:id` - View a specific article

### Admin Routes (Authentication Required)

- `GET /admin` - Admin login page / dashboard
- `POST /admin/login` - Admin authentication
- `POST /admin/logout` - Admin logout
- `GET /admin/new` - Create new article form
- `POST /admin/articles` - Create a new article
- `GET /admin/edit/:id` - Edit article form
- `PUT /admin/articles/:id` - Update an article
- `DELETE /admin/articles/:id` - Delete an article

## 🎨 Customization

### Styling
The application uses a custom CSS file located in `public/css/styles.css`. You can modify this file to customize the appearance of your blog.

### Templates
EJS templates are located in the `views/` directory. You can modify these files to change the layout and structure of your blog pages.

### Content
Articles are stored in `data/articles.json`. The structure of each article includes:
```json
{
  "id": "unique-uuid",
  "title": "Article Title",
  "content": "Article content...",
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z"
}
```

## 🐛 Common Issues & Troubleshooting

### 1. "Failed to lookup view 'admin'" Error
**Problem**: Missing admin view files
**Solution**: Ensure all admin view files exist in `views/admin/` directory:
- `views/admin/index.ejs`
- `views/admin/new.ejs`
- `views/admin/edit.ejs`

### 2. "Unexpected end of JSON input" Error
**Problem**: Empty or corrupted `articles.json` file
**Solution**: Initialize the file with an empty array:
```bash
echo "[]" > data/articles.json
```

### 3. Session Not Persisting
**Problem**: Session configuration issues
**Solution**: Check that `SESSION_SECRET` is set and sessions are properly configured in `index.js`

### 4. Static Files Not Loading
**Problem**: CSS/JS files not loading
**Solution**: Ensure the static middleware is properly configured and files are in the `public/` directory

## 🔧 Development

### Adding New Features

1. **Controllers**: Add new controllers in the `controllers/` directory
2. **Routes**: Define new routes in the `routes/` directory
3. **Services**: Add business logic in the `services/` directory
4. **Views**: Create new EJS templates in the `views/` directory
5. **Middleware**: Add custom middleware in the `middlewares/` directory

### Code Style

- Use ES6+ features where appropriate
- Follow MVC architecture patterns
- Implement proper error handling
- Add input validation for all user inputs
- Use meaningful variable and function names

## 📋 Todo / Future Enhancements

- [ ] User registration and management system
- [ ] Database integration (MySQL/PostgreSQL/MongoDB)
- [ ] Image upload functionality
- [ ] Rich text editor integration
- [ ] Article categories and tags
- [ ] Search functionality
- [ ] Comment system
- [ ] RSS feed generation
- [ ] SEO optimization
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] Deployment guides (Heroku, AWS, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built as part of the [roadmap.sh](https://roadmap.sh) backend development learning path.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [EJS](https://ejs.co/) - Embedded JavaScript templating
- [roadmap.sh](https://roadmap.sh) - Developer roadmaps and learning resources

---

**Happy Blogging! 📝**
