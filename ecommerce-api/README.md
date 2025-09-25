# E-commerce API

A comprehensive RESTful API for an e-commerce platform built with Node.js, Express.js, and Sequelize ORM. This project demonstrates backend development best practices and provides a solid foundation for learning e-commerce system architecture.

## 🚀 Features

- **User Authentication & Authorization** - JWT-based auth with role-based access control
- **Product Management** - CRUD operations for products with stock management
- **Shopping Cart** - Full cart functionality with persistent storage
- **Payment Integration** - Stripe payment processing (ready for implementation)
- **Database Relations** - Proper foreign key relationships and associations
- **Input Validation** - Comprehensive request validation and error handling
- **Security** - Password hashing, JWT tokens, and secure headers
- **API Documentation** - RESTful endpoints with clear response formats

## 🛠️ Tech Stack

- **Backend Framework:** Node.js with Express.js
- **Database:** MySQL with Sequelize ORM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Payment:** Stripe (configured)
- **Validation:** Built-in Sequelize validations
- **Development:** Nodemon for auto-restart

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MySQL database server
- npm or pnpm package manager
- Git

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ecommerce-api
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_NAME=ecommerce_db
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_DIALECT=mysql

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Payment Configuration (Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

### 4. Database Setup

Create your MySQL database:

```sql
CREATE DATABASE ecommerce_db;
```

### 5. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/v1/users/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/v1/products
```

#### Get Single Product
```http
GET /api/v1/products/:id
```

#### Create Product (Admin Only)
```http
POST /api/v1/products
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 100
}
```

#### Update Product (Admin Only)
```http
PUT /api/v1/products/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 79.99,
  "stock": 150
}
```

#### Delete Product (Admin Only)
```http
DELETE /api/v1/products/:id
Authorization: Bearer <your-jwt-token>
```

### Cart Endpoints

#### Get User's Cart
```http
GET /api/v1/cart
Authorization: Bearer <your-jwt-token>
```

#### Add Item to Cart
```http
POST /api/v1/cart/items
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "productId": "product-uuid",
  "quantity": 2
}
```

#### Update Cart Item Quantity
```http
PUT /api/v1/cart/items/:productId
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove Item from Cart
```http
DELETE /api/v1/cart/items/:productId
Authorization: Bearer <your-jwt-token>
```

#### Clear Entire Cart
```http
DELETE /api/v1/cart
Authorization: Bearer <your-jwt-token>
```

### Payment Endpoints

#### Process Payment
```http
POST /api/v1/payments/process
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "amount": 1000,
  "currency": "usd",
  "paymentMethodId": "stripe-payment-method-id"
}
```

## 🏗️ Project Structure

```
ecommerce-api/
│
├── configs/
│   ├── database.js          # Sequelize configuration
│   └── env.js              # Environment variables
│
├── controllers/
│   ├── cart.controller.js   # Cart business logic
│   ├── payment.controller.js # Payment processing
│   ├── product.controller.js # Product CRUD operations
│   └── user.controller.js   # User authentication
│
├── middlewares/
│   └── auth.middleware.js   # JWT authentication & authorization
│
├── models/
│   ├── index.js            # Model associations
│   ├── user.model.js       # User model
│   ├── product.model.js    # Product model
│   ├── cart.model.js       # Cart model
│   └── cart-items.model.js # Cart items model
│
├── routes/
│   ├── cart.route.js       # Cart routes
│   ├── payment.route.js    # Payment routes
│   ├── product.route.js    # Product routes
│   └── user.route.js       # User routes
│
├── utils/
│   └── database.js         # Database utilities
│
├── .env.example            # Environment variables template
├── index.js               # Application entry point
└── package.json           # Dependencies and scripts
```

## 🔐 Security Features

- **Password Hashing:** bcryptjs with salt rounds
- **JWT Authentication:** Secure token-based authentication
- **Role-Based Access:** Admin and user role separation
- **Input Validation:** Sequelize model validations
- **Error Handling:** Comprehensive error responses
- **CORS Configuration:** Cross-origin resource sharing setup

## 🗄️ Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `firstName` (String, Required)
- `lastName` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required, Hashed)
- `role` (Enum: 'user', 'admin')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Products Table
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `description` (Text, Required)
- `price` (Decimal, Required)
- `stock` (Integer, Required)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Carts Table
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → Users)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Cart Items Table
- `id` (UUID, Primary Key)
- `cart_id` (UUID, Foreign Key → Carts)
- `product_id` (UUID, Foreign Key → Products)
- `quantity` (Integer, Required, Min: 1)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## 🧪 Testing the API

### Using cURL

1. **Register a new user:**
```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'
```

2. **Login to get JWT token:**
```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

3. **Add item to cart:**
```bash
curl -X POST http://localhost:3000/api/v1/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"productId":"PRODUCT_UUID","quantity":2}'
```

### Using Postman

1. Import the API endpoints into Postman
2. Set up environment variables for base URL and JWT token
3. Test each endpoint with proper authentication headers

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-production-db-host
DB_NAME=your-production-db-name
DB_USER=your-production-db-user
DB_PASSWORD=your-production-db-password
JWT_SECRET=your-super-secure-production-jwt-secret
STRIPE_SECRET_KEY=your-production-stripe-key
```

### Important Production Notes

- Change JWT_SECRET to a strong, unique value
- Use environment variables for all sensitive data
- Set up proper database backups
- Configure HTTPS/SSL certificates
- Set up proper logging and monitoring
- Use database migrations instead of sync

## 🤝 Contributing

This project is designed for learning purposes. Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📖 Learning Resources

### Topics Covered
- RESTful API design principles
- JWT authentication and authorization
- Database relationships with Sequelize ORM
- Input validation and error handling
- Password hashing and security best practices
- MVC architecture pattern
- Environment configuration management
- Payment integration basics

### Next Steps for Learners
- Add comprehensive unit tests
- Implement API rate limiting
- Add email verification for user registration
- Create order management system
- Add product categories and filtering
- Implement user profiles and addresses
- Add product reviews and ratings
- Set up API documentation with Swagger

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💬 Support

If you have questions or need help with this project:

1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Join the discussion in the project's discussions section

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- Sequelize team for the powerful ORM
- All the open source contributors who made this project possible

---

**Happy Learning! 🎉**

*This project is part of the roadmap.sh backend development projects series, designed to help developers learn backend development through practical, real-world applications.*
