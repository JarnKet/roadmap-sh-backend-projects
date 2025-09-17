# Weather API Wrapper Service

A Node.js-based weather API wrapper service that provides cached weather data with rate limiting functionality. This project demonstrates how to build a robust API wrapper with caching, rate limiting, and proper error handling - perfect for learning backend development concepts.

## 🌟 Features

- **Weather Data Retrieval**: Fetch current weather information for any city worldwide
- **Redis Caching**: Implement caching to reduce API calls and improve response times (12-hour cache)
- **Rate Limiting**: Protect your API from abuse (10 requests per minute per IP)
- **Error Handling**: Comprehensive error handling for API failures and edge cases
- **Environment Configuration**: Secure configuration management with dotenv
- **RESTful API Design**: Clean and intuitive API endpoints

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **Redis server** (for caching)
- **Weather API key** from [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/roadmap-sh-backend-projects.git
   cd roadmap-sh-backend-projects/weather-api-wrapper-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you're using pnpm
   pnpm install
   ```

3. **Set up Redis using Docker**
   ```bash
   docker run --name my-redis -p 6379:6379 -d redis
   ```

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   WEATHER_API_KEY=your_visual_crossing_api_key_here
   PORT=3000
   REDIS_PORT=6379
   ```

   **Note**: Get your free API key from [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)

## 🎯 Usage

1. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

2. **Test the API**
   ```bash
   # Get weather for London
   curl "http://localhost:3000/api/v1/weather/london"
   
   # Get weather for New York
   curl "http://localhost:3000/api/v1/weather/new%20york"
   ```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### GET /weather/:city
Fetch weather data for a specific city.

**Parameters:**
- `city` (path parameter): The name of the city (URL encoded for cities with spaces)

**Example Requests:**
```bash
# Single word city
GET /api/v1/weather/london

# City with spaces (URL encoded)
GET /api/v1/weather/new%20york

# Case insensitive
GET /api/v1/weather/TOKYO
```

**Example Response:**
```json
{
  "queryCost": 1,
  "latitude": 51.5074,
  "longitude": -0.1278,
  "resolvedAddress": "London, England, United Kingdom",
  "address": "london",
  "timezone": "Europe/London",
  "tzoffset": 0.0,
  "description": "Similar temperatures continuing with a chance of rain.",
  "days": [
    {
      "datetime": "2024-01-15",
      "temp": 8.5,
      "humidity": 78.2,
      "description": "Partly cloudy throughout the day.",
      "conditions": "Partially cloudy"
    }
  ],
  "currentConditions": {
    "datetime": "14:30:00",
    "temp": 9.2,
    "humidity": 75,
    "conditions": "Partially cloudy",
    "windspeed": 12.5
  }
}
```

**Error Responses:**
```json
// City not found
{
  "error": "City not found"
}

// Rate limit exceeded
{
  "error": "Too many requests from this IP, please try again after a minute."
}

// Server error
{
  "error": "Internal Server Error"
}
```

## 🏗 Project Structure

```
weather-api-wrapper-service/
├── index.js                    # Application entry point & server setup
├── package.json                # Project dependencies and scripts
├── .env                        # Environment variables (create this)
├── configs/
│   ├── env.js                  # Environment configuration loader
│   ├── rate-limit.js           # Rate limiting configuration (10 req/min)
│   └── redis.js                # Redis connection setup (12h cache)
├── controllers/
│   └── weather.controller.js   # Weather API business logic
└── routes/
    └── weather.route.js        # API route definitions
```

## ⚙️ Configuration Details

### Rate Limiting
- **Window**: 1 minute (60,000ms)
- **Max Requests**: 10 requests per IP per minute
- **Headers**: Standard rate limit headers included in response

### Redis Caching
- **Cache Duration**: 12 hours (43,200 seconds)
- **Cache Key**: City name (converted to lowercase)
- **Cache Strategy**: Cache miss triggers API call, cache hit returns stored data

### Environment Variables
| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `WEATHER_API_KEY` | Visual Crossing Weather API key | Yes | - |
| `PORT` | Server port | No | 3000 |
| `REDIS_PORT` | Redis server port | No | 6379 |

## 🔧 API Integration Details

**Weather Data Source:** Visual Crossing Weather API
```
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json
```

**Features Used:**
- Metric units for temperature
- JSON response format
- Timeline data including current conditions and forecast

## 🎓 Learning Concepts Demonstrated

This project showcases several important backend development concepts:

### 1. **API Wrapper Design**
- How to integrate with third-party APIs
- Handling API responses and errors
- Data transformation and filtering

### 2. **Caching Strategy**
- Redis integration for performance optimization
- Cache-aside pattern implementation
- TTL (Time-To-Live) management

### 3. **Rate Limiting**
- Protecting APIs from abuse
- Express middleware implementation
- Client-side rate limit communication

### 4. **Error Handling**
- Try-catch blocks for async operations
- HTTP status code management
- User-friendly error messages

### 5. **Configuration Management**
- Environment variable usage
- Separation of configuration from code
- Security best practices

### 6. **RESTful API Design**
- Clean URL structure
- Proper HTTP methods
- Consistent response format

## 🚦 Testing the Service

### Manual Testing
```bash
# Test basic functionality
curl http://localhost:3000/api/v1/weather/london

# Test caching (run twice quickly)
curl http://localhost:3000/api/v1/weather/paris
curl http://localhost:3000/api/v1/weather/paris  # Should be faster (cached)

# Test rate limiting (run 11+ times quickly)
for i in {1..15}; do curl http://localhost:3000/api/v1/weather/tokyo; done
```

### Expected Behaviors
- First request: API call + caching
- Subsequent requests (within 12h): Cache hit
- >10 requests/minute: Rate limit error
- Invalid city: 400 error
- API key issues: 500 error

## 🤝 Contributing

This project is designed for learning! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Ideas for Enhancement
- Add weather alerts endpoint
- Implement weather history data
- Add forecast for multiple days
- Create a simple frontend interface
- Add unit tests
- Implement database logging
- Add API documentation with Swagger

## 📚 Educational Resources

This project is part of the [roadmap.sh Backend Projects](https://roadmap.sh/projects) series. It's designed to help you learn:

- Node.js and Express.js fundamentals
- Redis caching strategies
- API integration patterns
- Rate limiting implementation
- Environment configuration
- Error handling best practices

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weather data provided by [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
- Project inspired by [roadmap.sh](https://roadmap.sh) backend learning path
- Built for educational purposes and community learning

---

**Happy Learning! 🎉**

If you found this project helpful, please consider giving it a ⭐ on GitHub!
