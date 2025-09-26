# Fitness Workout Tracker API

A RESTful API for tracking fitness workouts, managing exercises, and user authentication. This project is part of the [roadmap.sh backend projects](https://roadmap.sh/projects) and serves as a learning resource for backend development with Node.js, Express, and MySQL.

## 🚀 Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Exercise Management**: Pre-seeded exercise database with various categories
- **Workout Tracking**: Create, read, update, and delete workouts
- **Workout Exercises**: Associate multiple exercises with sets and reps to workouts
- **Secure API**: Protected routes with JWT middleware
- **Database Transactions**: Ensures data consistency for complex operations

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv
- **CORS**: Enabled for cross-origin requests

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or pnpm package manager

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-workout-tracker-api
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   
   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=fitness_tracker_db
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Set up the database**
   
   Create a MySQL database:
   ```sql
   CREATE DATABASE fitness_tracker_db;
   ```
   
   Create the required tables:
   ```sql
   USE fitness_tracker_db;
   
   -- Users table
   CREATE TABLE users (
       id INT PRIMARY KEY AUTO_INCREMENT,
       username VARCHAR(255) UNIQUE NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Exercises table
   CREATE TABLE exercises (
       id INT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       category VARCHAR(100),
       muscle_group VARCHAR(100),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   -- Workouts table
   CREATE TABLE workouts (
       id INT PRIMARY KEY AUTO_INCREMENT,
       user_id INT NOT NULL,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   
   -- Workout exercises table
   CREATE TABLE workout_exercises (
       id INT PRIMARY KEY AUTO_INCREMENT,
       workout_id INT NOT NULL,
       exercise_id INT NOT NULL,
       sets INT NOT NULL,
       reps INT NOT NULL,
       weight DECIMAL(5,2),
       notes TEXT,
       FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE,
       FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
   );
   ```

5. **Seed the database with exercises**
   ```bash
   pnpm run seed
   # or
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   pnpm run dev
   # or
   npm run dev
   
   # Production mode
   pnpm start
   # or
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "success": true
}
```

#### Get User Profile
```http
GET /auth/profile
Authorization: Bearer <your-jwt-token>
```

### Exercise Endpoints

#### Get All Exercises
```http
GET /exercise
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "message": "Exercises fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Bench Press",
      "description": "A compound exercise for the chest, shoulders, and triceps.",
      "category": "Strength",
      "muscle_group": "Chest"
    }
  ],
  "success": true
}
```

### Workout Endpoints

#### Create Workout
```http
POST /workout
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Push Day",
  "description": "Chest, shoulders, and triceps workout",
  "exercises": [
    {
      "exercise_id": 1,
      "sets": 4,
      "reps": 8,
      "weight": 80.5
    },
    {
      "exercise_id": 4,
      "sets": 3,
      "reps": 10,
      "weight": 40.0
    }
  ]
}
```

#### Get All User Workouts
```http
GET /workout
Authorization: Bearer <your-jwt-token>
```

#### Get Specific Workout
```http
GET /workout/:id
Authorization: Bearer <your-jwt-token>
```

#### Update Workout
```http
PUT /workout/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Updated Push Day",
  "description": "Modified workout description"
}
```

#### Delete Workout
```http
DELETE /workout/:id
Authorization: Bearer <your-jwt-token>
```

## 🗂 Project Structure

```
fitness-workout-tracker-api/
├── configs/
│   ├── database.js          # Database connection configuration
│   └── env.js              # Environment variables setup
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── exercise.controller.js # Exercise management
│   └── workout.controller.js  # Workout CRUD operations
├── middlewares/
│   └── auth.middleware.js   # JWT authentication middleware
├── routes/
│   ├── auth.controller.js   # Authentication routes
│   ├── exercise.route.js    # Exercise routes
│   └── workout.route.js     # Workout routes
├── scripts/
│   └── seed.js             # Database seeding script
├── index.js                # Application entry point
├── package.json            # Project dependencies
└── README.md              # Project documentation
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🗄 Database Schema

The application uses four main tables:

- **users**: Store user account information
- **exercises**: Pre-defined exercises with categories and muscle groups
- **workouts**: User-created workout sessions
- **workout_exercises**: Junction table linking workouts to exercises with sets/reps

## 🧪 Testing the API

You can test the API using tools like:

- **Postman**: Import the endpoints and test with the provided examples
- **cURL**: Use command-line requests
- **Thunder Client**: VS Code extension for API testing

### Example cURL Commands

```bash
# Register a new user
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get exercises (replace TOKEN with actual JWT)
curl -X GET http://localhost:3000/api/v1/exercise \
  -H "Authorization: Bearer TOKEN"
```

## 🚀 Deployment

For production deployment:

1. Set up a production MySQL database
2. Update environment variables for production
3. Use a process manager like PM2
4. Set up reverse proxy with Nginx
5. Enable HTTPS with SSL certificates

## 🤝 Contributing

This project is designed for learning purposes. Feel free to:

- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues
- Suggest improvements

## 📝 Learning Objectives

This project helps you learn:

- RESTful API design principles
- JWT authentication implementation
- MySQL database integration
- Express.js middleware usage
- Database transactions
- Error handling and validation
- Environment configuration
- Database seeding and migrations

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

## 🙏 Acknowledgments

- [roadmap.sh](https://roadmap.sh) for the project idea and learning path
- Express.js and Node.js communities for excellent documentation
- MySQL for robust database functionality

---

**Happy Learning! 🚀**

For questions or issues, please open an issue in the repository or contribute to the discussion.
