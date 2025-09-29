# Image Processing Service

A powerful RESTful API service for uploading, storing, and processing images with various transformations. Built with Node.js, Express, and integrated with Cloudflare R2 for object storage.

## 🚀 Features

- **Image Upload**: Upload images to Cloudflare R2 object storage
- **Image Transformations**: Apply various transformations including:
  - Resize (width/height)
  - Crop (custom dimensions)
  - Rotate (any angle)
  - Filters (grayscale, sepia)
  - Format conversion (JPEG, PNG, WebP, etc.)
- **User Authentication**: JWT-based authentication system
- **User Management**: Register, login, and profile management
- **Image Management**: List, view, and manage uploaded images
- **Secure Access**: Role-based access control for image operations

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Image Processing**: Sharp.js
- **Object Storage**: Cloudflare R2 (S3-compatible)
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Environment**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or pnpm
- MongoDB (local or cloud instance)
- Cloudflare R2 account with bucket setup

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd image-processing-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   DB_URI=mongodb://localhost:27017/image-processing-service
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # Cloudflare R2 Configuration
   CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
   CLOUDFLARE_ACCESS_KEY_ID=your-r2-access-key
   CLOUDFLARE_SECRET_ACCESS_KEY=your-r2-secret-key
   CLOUDFLARE_BUCKET_NAME=your-bucket-name
   CLOUDFLARE_PUBLIC_URL=https://your-bucket-url.r2.dev
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📖 API Documentation

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
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Image Endpoints

All image endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Upload Image
```http
POST /images
Content-Type: multipart/form-data

Body: Form data with 'image' field containing the image file
```

#### List User Images
```http
GET /images
```

#### Get Image by ID
```http
GET /images/:id
```

#### Transform Image
```http
POST /images/:id/transform
Content-Type: application/json

{
  "transformations": {
    "resize": {
      "width": 800,
      "height": 600
    },
    "crop": {
      "left": 10,
      "top": 10,
      "width": 400,
      "height": 300
    },
    "rotate": 90,
    "filters": {
      "grayscale": true,
      "sepia": false
    },
    "format": "webp"
  }
}
```

### User Endpoints

#### Get User Profile
```http
GET /users/profile
```

## 🎯 Usage Examples

### 1. Register and Login
```javascript
// Register
const registerResponse = await fetch('/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});

// Login
const loginResponse = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});

const { token } = await loginResponse.json();
```

### 2. Upload Image
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const uploadResponse = await fetch('/api/v1/images', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const { image } = await uploadResponse.json();
```

### 3. Transform Image
```javascript
const transformResponse = await fetch(`/api/v1/images/${imageId}/transform`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    transformations: {
      resize: { width: 800, height: 600 },
      filters: { grayscale: true },
      format: 'webp'
    }
  })
});
```

## 🗂️ Project Structure

```
image-processing-service/
├── configs/
│   ├── database.js          # MongoDB connection setup
│   ├── env.js              # Environment variables configuration
│   └── s3-client.js        # Cloudflare R2 client setup
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── image.controller.js  # Image processing logic
│   └── user.controller.js   # User management logic
├── middlewares/
│   └── auth.middleware.js   # JWT authentication middleware
├── models/
│   ├── image.model.js      # Image data model
│   └── user.model.js       # User data model
├── routes/
│   ├── auth.route.js       # Authentication routes
│   ├── image.route.js      # Image processing routes
│   └── user.route.js       # User management routes
├── index.js                # Application entry point
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **User Authorization**: Users can only access their own images
- **Input Validation**: Multer for file upload validation
- **CORS**: Cross-origin resource sharing configuration

## 🌟 Transformation Options

The service supports various image transformations:

| Operation | Description | Parameters |
|-----------|-------------|------------|
| **Resize** | Change image dimensions | `{ width: number, height: number }` |
| **Crop** | Extract portion of image | `{ left: number, top: number, width: number, height: number }` |
| **Rotate** | Rotate image by degrees | `number` (degrees) |
| **Grayscale** | Convert to grayscale | `boolean` |
| **Sepia** | Apply sepia effect | `boolean` |
| **Format** | Change image format | `'jpeg' \| 'png' \| 'webp' \| 'tiff'` |

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=3000
DB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-production-jwt-secret
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-access-key
CLOUDFLARE_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_BUCKET_NAME=your-bucket-name
CLOUDFLARE_PUBLIC_URL=https://your-domain.r2.dev
```

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Sharp.js](https://sharp.pixelplumbing.com/) for image processing
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) for object storage
- [Express.js](https://expressjs.com/) for the web framework
- [MongoDB](https://www.mongodb.com/) for the database

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Happy coding! 🎉**
