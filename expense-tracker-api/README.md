# Expense Tracker API

A RESTful API for managing personal expenses with user authentication and comprehensive filtering capabilities. Built with Node.js, Express.js, Sequelize ORM, and MySQL database. Perfect for learning backend development concepts!

## 🚀 Features

- ✅ User registration and authentication
- ✅ JWT-based authorization
- ✅ CRUD operations for expenses
- ✅ Advanced expense filtering (by date, category, custom ranges)
- ✅ Predefined expense categories
- ✅ Secure password hashing with bcrypt
- ✅ Database relationships (User-Expense)
- ✅ Input validation and error handling
- ✅ CORS support

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv
- **Development Tool**: Nodemon

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MySQL Server
- npm or pnpm package manager

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd expense-tracker-api
```

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

3. **Create a `.env` file in the root directory:**
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=expense_tracker_db
JWT_SECRET=your_super_secret_jwt_key
```

4. **Create the database in MySQL:**
```sql
CREATE DATABASE expense_tracker_db;
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### 🔐 Authentication Endpoints

#### Register User
- **POST** `/auth/register`
- **Body**:
```json
{
  "username": "johndoe",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "User successfully registered",
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "johndoe"
    },
    "accessToken": "jwt_token_here"
  }
}
```

#### Login User
- **POST** `/auth/login`
- **Body**:
```json
{
  "username": "johndoe",
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
      "username": "johndoe"
    },
    "accessToken": "jwt_token_here"
  }
}
```

### 💰 Expense Endpoints

> **Note**: All expense endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer <your_jwt_token>
> ```

#### Create Expense
- **POST** `/expenses`
- **Body**:
```json
{
  "category": "Groceries",
  "amount": 75.50,
  "date": "2024-01-15"
}
```
- **Response**:
```json
{
  "message": "Expense created successfully",
  "success": true,
  "data": {
    "id": 1,
    "category": "Groceries",
    "amount": "75.50",
    "date": "2024-01-15",
    "userId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Expenses
- **GET** `/expenses`
- **Query Parameters** (optional):
  - `filter`: `week` | `month` | `last3months` | `custom`
  - `startDate`: `YYYY-MM-DD` (required when filter=custom)
  - `endDate`: `YYYY-MM-DD` (required when filter=custom)

**Examples:**
```bash
# Get all expenses
GET /expenses

# Get expenses from last week
GET /expenses?filter=week

# Get expenses from last month
GET /expenses?filter=month

# Get expenses from last 3 months
GET /expenses?filter=last3months

# Get expenses from custom date range
GET /expenses?filter=custom&startDate=2024-01-01&endDate=2024-01-31
```

- **Response**:
```json
{
  "message": "Expenses fetched successfully",
  "success": true,
  "data": [
    {
      "id": 1,
      "category": "Groceries",
      "amount": "75.50",
      "date": "2024-01-15",
      "userId": 1,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Get Single Expense
- **GET** `/expenses/:id`
- **Response**:
```json
{
  "message": "Expense fetched successfully",
  "success": true,
  "data": {
    "id": 1,
    "category": "Groceries",
    "amount": "75.50",
    "date": "2024-01-15",
    "userId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Update Expense
- **PUT** `/expenses/:id`
- **Body**:
```json
{
  "category": "Health",
  "amount": 120.00,
  "date": "2024-01-16"
}
```
- **Response**:
```json
{
  "message": "Expense updated successfully",
  "success": true,
  "data": {
    "id": 1,
    "category": "Health",
    "amount": "120.00",
    "date": "2024-01-16",
    "userId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-16T11:45:00.000Z"
  }
}
```

#### Delete Expense
- **DELETE** `/expenses/:id`
- **Response**:
```json
{
  "message": "Expense deleted successfully",
  "success": true
}
```

### 🧪 Test Token Endpoint
- **GET** `/test-token`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "message": "Token is valid",
  "user": {
    "userId": 1,
    "username": "johndoe"
  }
}
```

## 📊 Expense Categories

The API supports the following predefined categories:

- `Groceries`
- `Leisure`
- `Electronics`
- `Utilities`
- `Clothing`
- `Health`
- `Others`

## 🗄️ Database Schema

### Users Table
- `id` (INTEGER, PRIMARY KEY, AUTO INCREMENT)
- `username` (STRING, NOT NULL, UNIQUE)
- `password` (STRING, NOT NULL, HASHED)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Expenses Table
- `id` (INTEGER, PRIMARY KEY, AUTO INCREMENT)
- `category` (ENUM, NOT NULL)
- `amount` (DECIMAL(10,2), NOT NULL)
- `date` (DATE, NOT NULL)
- `userId` (INTEGER, FOREIGN KEY)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

## ⚠️ Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `409` - Conflict (duplicate username)
- `500` - Internal Server Error

**Example error response:**
```json
{
  "message": "Category, Amount and Date are required",
  "success": false
}
```

## 📁 Project Structure

```
expense-tracker-api/
├── configs/
│   ├── database.js      # Database configuration
│   └── env.js          # Environment variables
├── controllers/
│   ├── auth.controller.js    # Authentication logic
│   └── expense.controller.js # Expense CRUD operations
├── middlewares/
│   └── auth.middleware.js    # JWT authentication middleware
├── models/
│   ├── index.js         # Models index file
│   ├── expense.model.js # Expense model definition
│   └── user.model.js    # User model definition
├── routes/
│   ├── auth.route.js    # Authentication routes
│   └── expense.route.js # Expense routes
├── index.js            # Application entry point
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 🎯 Learning Objectives

This project demonstrates key backend development concepts:

1. **RESTful API Design** - Following REST principles for API endpoints
2. **Authentication & Authorization** - JWT-based user authentication
3. **Database Design** - Relational database with foreign keys
4. **ORM Usage** - Sequelize for database operations
5. **Middleware** - Custom authentication middleware
6. **Error Handling** - Proper error responses and status codes
7. **Input Validation** - Request data validation
8. **Environment Configuration** - Using environment variables
9. **Security** - Password hashing and JWT tokens
10. **Query Parameters** - Advanced filtering with query params

## 🚀 Future Enhancements

- [ ] Add expense summary/analytics endpoints
- [ ] Implement expense categories management
- [ ] Add pagination for expenses list
- [ ] Include expense search functionality
- [ ] Add data export features (CSV, PDF)
- [ ] Implement expense budgeting features
- [ ] Add expense sharing between users
- [ ] Include file upload for expense receipts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

For any questions or suggestions, please feel free to reach out or create an issue in the repository.

---

**Happy Learning! 🎓**

This project is perfect for developers looking to understand backend API development, database relationships, and authentication mechanisms. Feel free to use it as a reference or starting point for your own projects!
