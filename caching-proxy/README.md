# Caching Proxy Server

A lightweight HTTP proxy server with built-in caching capabilities. This proxy server forwards requests to an origin server while caching responses to improve performance and reduce load on the upstream server.

## Features

- ✅ **HTTP Proxy**: Forward requests to any origin server
- 🚀 **Intelligent Caching**: Cache responses based on HTTP method and URL
- 💾 **Persistent Cache**: Store cache data in JSON file for persistence across restarts
- 🧹 **Cache Management**: Clear cache on command
- 📊 **Cache Hit/Miss Headers**: `X-Cache` header indicates HIT or MISS
- ⚙️ **Configurable**: Set custom port and origin server via command line

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or pnpm

### Local Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd caching-proxy
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

### Global Installation

Install globally to use from anywhere:
```bash
npm install -g .
```

## Usage

### Basic Usage

Start the proxy server with a specific port and origin server:

```bash
node index.js --port 3000 --origin http://dummyjson.com
```

Or if installed globally:
```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

### Command Line Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--port` | `-p` | Port number to run the server on | 3000 |
| `--origin` | `-o` | Origin URL to proxy requests to | Required |
| `--clear-cache` | - | Clear the cache and exit | false |

### Examples

1. **Start proxy server:**
```bash
node index.js --port 8080 --origin https://jsonplaceholder.typicode.com
```

2. **Clear cache:**
```bash
node index.js --clear-cache
```

3. **Using short aliases:**
```bash
node index.js -p 3000 -o http://dummyjson.com
```

### Making Requests

Once the server is running, you can make requests through the proxy:

```bash
# First request (Cache MISS)
curl http://localhost:3000/products/1

# Second request (Cache HIT)
curl http://localhost:3000/products/1
```

The response will include an `X-Cache` header:
- `X-Cache: MISS` - Data fetched from origin server
- `X-Cache: HIT` - Data served from cache

## How It Works

1. **Request Processing**: When a request comes in, the server creates a cache key using the HTTP method and URL
2. **Cache Check**: The server checks if the response exists in the cache
3. **Cache Hit**: If found, returns cached response with `X-Cache: HIT` header
4. **Cache Miss**: If not found, forwards request to origin server, caches the response, and returns it with `X-Cache: MISS` header
5. **Persistence**: Cache is stored in `cache.json` file for persistence across server restarts

## Cache Storage

The cache is stored in a `cache.json` file in the project directory. Each cache entry contains:
- HTTP status code
- Response headers
- Response data

## Project Structure

```
caching-proxy/
├── index.js           # Main server file
├── package.json       # Project dependencies and metadata
├── cache.json         # Cache storage (created automatically)
└── README.md          # This file
```

## Error Handling

- **Origin Server Errors**: Forwards error responses from the origin server
- **Network Errors**: Returns 502 Bad Gateway for connection issues
- **Invalid Requests**: Handles malformed requests gracefully

## Development

### Running in Development Mode

```bash
node index.js --port 3000 --origin http://localhost:8000
```

### Testing

You can test the proxy with any HTTP client:

```javascript
// Using fetch in browser/Node.js
fetch('http://localhost:3000/api/users')
  .then(response => {
    console.log('Cache Status:', response.headers.get('X-Cache'));
    return response.json();
  })
  .then(data => console.log(data));
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

ISC License

## Roadmap

- [ ] Add TTL (Time To Live) for cache entries
- [ ] Implement cache size limits
- [ ] Add support for HTTP headers-based caching
- [ ] Add metrics and monitoring endpoints
- [ ] Support for cache invalidation patterns
- [ ] Docker support

## FAQ

**Q: How long do cached responses last?**
A: Currently, cached responses persist until manually cleared or the server is restarted with cache cleared.

**Q: What types of requests are cached?**
A: All HTTP methods and URLs are cached based on the combination of method + URL.

**Q: Can I use this in production?**
A: This is a learning project. For production use, consider adding proper error handling, security measures, and cache management features.

---

This project is part of the [Roadmap.sh Backend Projects](https://roadmap.sh/projects) collection, designed to help developers learn backend development concepts through practical implementation.
