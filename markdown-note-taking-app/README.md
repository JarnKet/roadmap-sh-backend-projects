# Markdown Note-Taking App API

A RESTful API for creating, managing, and organizing markdown notes. This backend service allows users to create, read, update, delete, and search through markdown-formatted notes stored as individual files on the server.

## 🚀 Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete markdown notes
- 📝 **Markdown Support**: Full support for markdown formatting
- 🔍 **Search Functionality**: Search through notes by title or content
- 📁 **File-based Storage**: Notes stored as individual .md files
- 📤 **File Upload**: Support for file uploads (images, documents)
- 🔒 **UUID-based IDs**: Secure unique identifiers for each note
- 🌐 **RESTful API**: Standard REST endpoints for easy integration
- ⚡ **Express.js**: Built with Express.js for fast performance

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or pnpm
- Basic knowledge of REST APIs

## 🛠️ Installation

### Local Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd markdown-note-taking-app
```

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

3. **Start the server:**
```bash
npm start
# or
node index.js
```

4. **Server will run on:**
```
http://localhost:3000
```

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Notes Management

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/notes` | Get all notes | - |
| `GET` | `/notes/:id` | Get a specific note | - |
| `POST` | `/notes` | Create a new note | `{title, content}` |
| `PUT` | `/notes/:id` | Update a note | `{title, content}` |
| `DELETE` | `/notes/:id` | Delete a note | - |
| `GET` | `/notes/search?q=query` | Search notes | - |

#### Utility Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/upload` | Upload files | Form data |
| `GET` | `/health` | Health check | - |

### Request/Response Examples

#### Create a New Note
```bash
curl -X POST http://localhost:3000/api/v1/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Note",
    "content": "# Hello World\n\nThis is my first **markdown** note!"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "2235af48-e060-4c48-a852-fe375c911632",
    "title": "My First Note",
    "content": "# Hello World\n\nThis is my first **markdown** note!",
    "createdAt": "2025-09-19T10:30:00.000Z",
    "updatedAt": "2025-09-19T10:30:00.000Z"
  }
}
```

#### Get All Notes
```bash
curl http://localhost:3000/api/v1/notes
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "2235af48-e060-4c48-a852-fe375c911632",
      "title": "My First Note",
      "content": "# Hello World\n\nThis is my first **markdown** note!",
      "createdAt": "2025-09-19T10:30:00.000Z",
      "updatedAt": "2025-09-19T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### Search Notes
```bash
curl "http://localhost:3000/api/v1/notes/search?q=markdown"
```

#### Update a Note
```bash
curl -X PUT http://localhost:3000/api/v1/notes/2235af48-e060-4c48-a852-fe375c911632 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Note",
    "content": "# Updated Content\n\nThis note has been **updated**!"
  }'
```

#### Delete a Note
```bash
curl -X DELETE http://localhost:3000/api/v1/notes/2235af48-e060-4c48-a852-fe375c911632
```

## 🏗️ Project Structure

```
markdown-note-taking-app/
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
├── pnpm-lock.yaml          # Package lock file
├── README.md               # This file
├── configs/
│   └── multer.js           # File upload configuration
├── controllers/
│   ├── note.controller.js   # Note business logic
│   └── utility.controller.js # Utility functions
├── routes/
│   ├── note.route.js       # Note API routes
│   └── utility.route.js    # Utility routes
└── notes/                  # Stored markdown files
    ├── [uuid].md           # Individual note files
    └── ...
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
UPLOAD_DIR=./uploads
NOTES_DIR=./notes
MAX_FILE_SIZE=5mb
```

### Multer Configuration

The app uses Multer for file uploads. Configure in `configs/multer.js`:

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({ storage });
```

## 📝 Markdown Support

The API supports full markdown syntax including:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Emphasis**: `*italic*`, `**bold**`
- **Lists**: `- item` or `1. item`
- **Links**: `[text](url)`
- **Images**: `![alt](src)`
- **Code**: `` `inline` `` or ``` blocks ```
- **Tables**, **Blockquotes**, and more!

## 🧪 Testing

### Manual Testing with curl

Test all endpoints using the examples provided above.

### Postman Collection

Import the following collection to Postman:

```json
{
  "info": {
    "name": "Markdown Notes API"
  },
  "item": [
    {
      "name": "Get All Notes",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/notes"
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000/api/v1"
    }
  ]
}
```

## 🚦 Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## 🔐 Security Considerations

- File uploads are restricted by size and type
- UUID-based IDs prevent enumeration attacks
- Input validation prevents injection attacks
- Consider adding authentication for production use

## 🚀 Development

### Running in Development Mode

```bash
# Install nodemon for auto-restart
npm install -g nodemon

# Run with nodemon
nodemon index.js
```

### Adding New Features

1. **Controllers**: Add business logic in `controllers/`
2. **Routes**: Define API endpoints in `routes/`
3. **Middleware**: Add custom middleware for validation, auth, etc.

## 📦 Deployment

### Using PM2 (Recommended)

```bash
npm install -g pm2
pm2 start index.js --name "markdown-notes-api"
pm2 startup
pm2 save
```

### Using Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit: `git commit -am 'Add feature'`
6. Push: `git push origin feature-name`
7. Submit a pull request

## 🛣️ Roadmap

- [ ] User authentication and authorization
- [ ] Note categories and tags
- [ ] Real-time collaboration
- [ ] Markdown preview endpoint
- [ ] Export notes to PDF
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Note versioning and history
- [ ] Full-text search with indexing
- [ ] API rate limiting
- [ ] Docker containerization

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ FAQ

**Q: How are notes stored?**
A: Notes are stored as individual markdown files in the `notes/` directory, named with UUID identifiers.

**Q: Can I use a database instead of files?**
A: Yes! You can modify the controllers to use any database. The current file-based approach is great for learning and small-scale applications.

**Q: Is there a frontend for this API?**
A: This is a backend-only project. You can build a frontend using React, Vue, or any other framework that consumes REST APIs.

**Q: How do I backup my notes?**
A: Simply backup the `notes/` directory. All your markdown files are stored there.

---

This project is part of the [Roadmap.sh Backend Projects](https://roadmap.sh/projects) collection, designed to help developers learn backend development through practical implementation.

## 🔗 Related Projects

- [Personal Blog](../personal-blog/) - A blog system that could integrate with this notes API
- [Todo List API](../todo-list-api/) - Similar REST API patterns for task management
- [Expense Tracker API](../expense-tracker-api/) - Another CRUD API example

---

**Happy coding! 🎉**
