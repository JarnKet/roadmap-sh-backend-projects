# Personal Blog

A full-featured personal blogging platform built with Node.js, Express.js, and EJS templating engine. This project demonstrates modern web development practices including MVC architecture, session management, input validation, and responsive design.

## 🚀 Features

- **Public Blog Interface**: Clean, responsive design for reading articles
- **Admin Panel**: Secure administrative interface for content management
- **Article Management**: Create, read, update, and delete blog articles
- **Rich Text Content**: Support for formatted content with paragraphs and styling
- **Session-based Authentication**: Secure admin authentication system
- **Input Validation**: Server-side validation for all forms
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Mobile-friendly interface
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 📁 Project Structure

```
personal-blog/
├── controllers/           # Route handlers and business logic
│   ├── admin.controller.js    # Admin authentication and dashboard
│   └── article.controller.js  # Article CRUD operations
├── data/                 # Data storage
│   └── articles.json         # JSON file-based article storage
├── middlewares/          # Custom middleware functions
│   └── auth.middleware.js    # Authentication middleware
├── public/              # Static assets
│   └── css/
│       └── styles.css        # Application styles
├── routes/              # Route definitions
│   ├── admin.route.js        # Admin routes
│   └── article.route.js      # Public article routes
├── services/            # Business logic services
│   └── article.service.js    # Article data operations
├── views/               # EJS templates
│   ├── admin/               # Admin panel templates
│   │   ├── edit.ejs         # Edit article form
│   │   ├── index.ejs        # Admin dashboard
│   │   └── new.ejs          # New article form
│   ├── article.ejs          # Single article view
│   ├── error.ejs            # Error page template
│   ├── home.ejs             # Homepage with article list
│   └── layout.ejs           # Base layout template
├── index.js             # Main application entry point
└── package.json         # Dependencies and scripts
```

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Session Management**: express-session
- **Validation**: express-validator
- **HTTP Methods**: method-override for PUT/DELETE support
- **Styling**: CSS3 with responsive design
- **Data Storage**: JSON file-based storage
- **Development**: nodemon for hot reloading

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- A text editor or IDE

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd personal-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration (Optional)**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   SESSION_SECRET=your-secret-key-here
   ADMIN_PASSPHRASE=your-admin-password
   NODE_ENV=development
   ```

4. **Initialize data file**
   Ensure the `data/articles.json` file exists. If it doesn't, create it with:
   ```json
   []
   ```

5. **Start the application**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Public blog: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

## 🔐 Admin Access

The admin panel is protected with a simple passphrase authentication:

- **Default passphrase**: `ADMIN`
- **Custom passphrase**: Set `ADMIN_PASSPHRASE` in your environment variables

**Note**: In a production environment, implement proper user authentication with hashed passwords and secure session management.

## 📚 API Endpoints

### Public Routes
- `GET /` - Redirects to home page
- `GET /home` - Display all articles
- `GET /articles/:id` - View single article

### Admin Routes
- `GET /admin` - Admin login/dashboard
- `POST /admin/login` - Admin authentication
- `POST /admin/logout` - Admin logout
- `GET /admin/new` - New article form
- `POST /admin/articles` - Create new article
- `GET /admin/edit/:id` - Edit article form
- `PUT /admin/articles/:id` - Update article
- `DELETE /admin/articles/:id` - Delete article

## 🎨 Features in Detail

### Article Management
- **Create**: Rich text editor for creating new blog posts
- **Read**: Public interface for reading articles
- **Update**: Edit existing articles through admin panel
- **Delete**: Remove articles with confirmation

### Authentication System
- Session-based authentication for admin users
- Middleware protection for admin routes
- Secure logout functionality

### Input Validation
- Server-side validation using express-validator
- Client-side form validation
- Error messaging and user feedback

### Responsive Design
- Mobile-first approach
- Clean, readable typography
- Intuitive navigation

## 🔧 Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Adding New Features

1. **Controllers**: Add business logic in `controllers/`
2. **Routes**: Define new routes in `routes/`
3. **Views**: Create EJS templates in `views/`
4. **Services**: Add data operations in `services/`
5. **Middleware**: Custom middleware in `middlewares/`

### Code Structure Guidelines

- Follow MVC (Model-View-Controller) pattern
- Use async/await for asynchronous operations
- Implement proper error handling
- Add input validation for all forms
- Write descriptive comments and JSDoc

## 🐛 Troubleshooting

### Common Issues

1. **View "admin" not found error**
   - Ensure all view files exist in the correct directory structure
   - Check the views path configuration in `index.js`

2. **JSON parse error on empty articles.json**
   - Initialize `data/articles.json` with an empty array `[]`
   - Handle empty file scenarios in article service

3. **Session not persisting**
   - Check session configuration in `index.js`
   - Ensure cookies are enabled in browser

4. **Static files not loading**
   - Verify public directory path configuration
   - Check file permissions and paths

## 🔒 Security Considerations

- Change default admin passphrase in production
- Use environment variables for sensitive data
- Implement HTTPS in production
- Add rate limiting for authentication endpoints
- Validate and sanitize all user inputs
- Use secure session configuration

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secure-session-secret
ADMIN_PASSPHRASE=your-secure-admin-password
```

### Production Considerations
- Use a process manager like PM2
- Implement proper logging
- Set up reverse proxy (nginx/Apache)
- Use HTTPS certificates
- Consider database migration from JSON to MongoDB/PostgreSQL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as part of the [Roadmap.sh Backend Projects](https://roadmap.sh/projects)
- Inspired by modern blogging platforms
- Uses industry-standard Node.js practices

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Create an issue in the repository

---

**Happy Blogging! 🎉**

This project serves as an excellent learning resource for:
- Node.js and Express.js fundamentals
- EJS templating engine
- Session-based authentication
- MVC architecture patterns
- RESTful API design
- File-based data storage
- Form handling and validation
