# Todo List API

A RESTful API for managing todo items with user authentication. Built with Node.js, Express.js, Sequelize ORM, and MySQL database.

## Features

- ✅ User registration and authentication
- ✅ JWT-based authorization
- ✅ CRUD operations for todos
- ✅ Secure password hashing with bcrypt
- ✅ Database relationships (User-Todo)
- ✅ Input validation and error handling
- ✅ CORS support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MySQL Server
- npm or pnpm package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-list-api
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=todo_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
```

4. Create the database in MySQL:
```sql
CREATE DATABASE todo_db;
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
- **POST** `/register`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "User created successfully",
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
- **POST** `/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "Login successful",
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "jwt_token_here"
  }
}
```

### Todo Endpoints

> **Note**: All todo endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

#### Get All Todos
- **GET** `/todo`
- **Response**:
```json
{
  "message": "Todos retrieved successfully",
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the todo API project",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Todo
- **GET** `/todo/:id`
- **Response**:
```json
{
  "message": "Todo retrieved successfully",
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo API project",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Create Todo
- **POST** `/todo`
- **Body**:
```json
{
  "title": "Complete project",
  "description": "Finish the todo API project"
}
```
- **Response**:
```json
{
  "message": "Todo created successfully",
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the todo API project",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Todo
- **PUT** `/todo/:id`
- **Body**:
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```
- **Response**:
```json
{
  "message": "Todo updated successfully",
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  }
}
```

#### Delete Todo
- **DELETE** `/todo/:id`
- **Response**:
```json
{
  "message": "Todo deleted successfully",
  "success": true
}
```

### Test Token Endpoint
- **GET** `/test-token`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Token is valid",
  "success": true,
  "user": {
    "userId": 1,
    "email": "john@example.com"
  }
}
```

## Database Schema

### Users Table
- `id` (INTEGER, PRIMARY KEY, AUTO INCREMENT)
- `name` (STRING, NOT NULL)
- `email` (STRING, NOT NULL, UNIQUE)
- `password` (STRING, NOT NULL, HASHED)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Todos Table
- `id` (INTEGER, PRIMARY KEY, AUTO INCREMENT)
- `title` (STRING, NOT NULL)
- `description` (TEXT, NULLABLE)
- `completed` (BOOLEAN, DEFAULT FALSE)
- `userId` (INTEGER, FOREIGN KEY)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

Example error response:
```json
{
  "message": "All fields are required",
  "success": false
}
```

## Project Structure

```
todo-list-api/
├── configs/
│   ├── database.js      # Database configuration
│   └── env.js          # Environment variables
├── controllers/
│   ├── todo.controller.js
│   └── user.controller.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── index.js
│   ├── todo.model.js
│   └── user.model.js
├── routes/
│   ├── todo.route.js
│   └── user.route.js
├── utils/
│   └── database.js     # Database utilities
├── index.js           # Application entry point
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For any questions or suggestions, please feel free to reach out or create an issue in the repository.
