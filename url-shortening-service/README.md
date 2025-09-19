# URL Shortening Service

A RESTful API service that allows users to shorten long URLs, manage them, and track usage statistics. This project is built with Node.js, Express.js, and MySQL, making it perfect for learning backend development concepts.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **URL Redirection**: Automatic redirection to original URLs using short codes
- **CRUD Operations**: Create, read, update, and delete shortened URLs
- **Usage Statistics**: Track access count and timestamps for each URL
- **Unique Short Codes**: Generate collision-resistant short codes using nanoid
- **Database Persistence**: Store URLs and statistics in MySQL database

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MySQL** - Relational database management system
- **nanoid** - URL-safe unique string ID generator
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MySQL Server
- npm or pnpm package manager

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd url-shortening-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Setup MySQL Database**
   - Create a MySQL database using the provided SQL script:
   ```bash
   mysql -u your_username -p < sql/init.sql
   ```

4. **Configure Environment Variables**
   - Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=url_shortener
   ```

5. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

The server will start running on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Create Shortened URL
- **POST** `/api/v1/shorten`
- **Description**: Create a new shortened URL
- **Request Body**:
  ```json
  {
    "url": "https://www.example.com/very-long-url-that-needs-shortening"
  }
  ```
- **Response**:
  ```json
  {
    "message": "URL shortened successfully",
    "success": true,
    "data": {
      "id": 1,
      "original_url": "https://www.example.com/very-long-url-that-needs-shortening",
      "short_code": "abc123",
      "access_count": 0,
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  }
  ```

#### 2. Get Shortened URL Details
- **GET** `/api/v1/shorten/:shortCode`
- **Description**: Retrieve details of a shortened URL (without access count)
- **Response**:
  ```json
  {
    "message": "URL found",
    "success": true,
    "data": {
      "id": 1,
      "original_url": "https://www.example.com/very-long-url-that-needs-shortening",
      "short_code": "abc123",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  }
  ```

#### 3. Update Shortened URL
- **PUT** `/api/v1/shorten/:shortCode`
- **Description**: Update the original URL for an existing short code
- **Request Body**:
  ```json
  {
    "url": "https://www.updated-example.com"
  }
  ```

#### 4. Delete Shortened URL
- **DELETE** `/api/v1/shorten/:shortCode`
- **Description**: Delete a shortened URL
- **Response**:
  ```json
  {
    "message": "URL deleted successfully",
    "success": true
  }
  ```

#### 5. Get URL Statistics
- **GET** `/api/v1/shorten/:shortCode/stats`
- **Description**: Get detailed statistics including access count
- **Response**:
  ```json
  {
    "message": "URL found",
    "success": true,
    "data": {
      "id": 1,
      "original_url": "https://www.example.com/very-long-url-that-needs-shortening",
      "short_code": "abc123",
      "access_count": 15,
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T10:00:00.000Z"
    }
  }
  ```

#### 6. Redirect to Original URL
- **GET** `/:shortCode`
- **Description**: Redirects to the original URL and increments access count
- **Response**: HTTP 301 redirect to the original URL

## 🗄️ Database Schema

The application uses a single MySQL table:

```sql
CREATE TABLE urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_code VARCHAR(10) NOT NULL UNIQUE,
    access_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 📁 Project Structure

```
url-shortening-service/
├── configs/
│   ├── database.js          # Database connection configuration
│   └── env.js               # Environment variables configuration
├── controller/
│   └── shorten.controller.js # Business logic for URL operations
├── routes/
│   └── shorten.route.js     # API route definitions
├── sql/
│   └── init.sql             # Database initialization script
├── index.js                 # Main application entry point
├── package.json             # Project dependencies and scripts
└── README.md               # Project documentation
```

## 🧪 Example Usage

### Using cURL

1. **Create a shortened URL:**
   ```bash
   curl -X POST http://localhost:3000/api/v1/shorten \
        -H "Content-Type: application/json" \
        -d '{"url": "https://www.github.com"}'
   ```

2. **Access the shortened URL:**
   ```bash
   curl -L http://localhost:3000/abc123
   ```

3. **Get URL statistics:**
   ```bash
   curl http://localhost:3000/api/v1/shorten/abc123/stats
   ```

### Using JavaScript (fetch)

```javascript
// Create shortened URL
const response = await fetch('http://localhost:3000/api/v1/shorten', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://www.github.com'
  })
});

const data = await response.json();
console.log('Short URL:', `http://localhost:3000/${data.data.short_code}`);
```

## 🔍 Learning Objectives

This project demonstrates several important backend development concepts:

- **RESTful API Design**: Proper HTTP methods and status codes
- **Database Operations**: CRUD operations with MySQL
- **Error Handling**: Comprehensive error responses and validation
- **Environment Configuration**: Secure configuration management
- **URL Generation**: Unique identifier generation with collision handling
- **Request/Response Handling**: JSON API responses and redirects
- **Database Relationships**: Simple table structure with indexes
- **Middleware Usage**: Express.js middleware for request parsing

## 🚦 HTTP Status Codes

- `200` - Success (GET, PUT, DELETE operations)
- `201` - Created (POST operations)
- `301` - Permanent Redirect (URL redirection)
- `400` - Bad Request (Missing or invalid parameters)
- `404` - Not Found (URL not found)
- `409` - Conflict (Duplicate short code)
- `500` - Internal Server Error

## 🤝 Contributing

This project is designed for learning purposes. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- User authentication and authorization
- Custom short codes
- URL expiration dates
- Analytics dashboard
- Rate limiting
- Bulk URL operations
- QR code generation
- API key authentication

---

**Happy Learning! 🚀**

This project provides a solid foundation for understanding backend development with Node.js and databases. Use it as a starting point to build more complex applications!
