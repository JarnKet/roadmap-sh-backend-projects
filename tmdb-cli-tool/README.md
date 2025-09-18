# TMDB CLI Tool

A command-line interface tool for fetching and displaying movie information from The Movie Database (TMDB) API. Perfect for learning CLI development, API integration, and Node.js fundamentals!

## 🎬 Features

- ✅ Fetch movies by different categories (Popular, Top Rated, Upcoming, Now Playing)
- ✅ Display top 10 movies with detailed information
- ✅ Clean and formatted output with movie titles, release dates, ratings, and overviews
- ✅ Comprehensive error handling for network and API issues
- ✅ Command-line argument parsing with Commander.js
- ✅ Environment variable configuration for API security

## 🛠 Tech Stack

- **Runtime**: Node.js
- **HTTP Client**: Axios
- **CLI Framework**: Commander.js
- **Environment Variables**: dotenv
- **API**: The Movie Database (TMDB) API

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or pnpm package manager
- TMDB API Key (free registration at [TMDB](https://www.themoviedb.org/settings/api))

## 📦 Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd tmdb-cli-tool
```

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

3. **Get your TMDB API Key:**
   - Visit [TMDB API](https://www.themoviedb.org/settings/api)
   - Register for a free account
   - Request an API key
   - Copy your API key

4. **Create a `.env` file in the root directory:**
```env
API_BASE_URL=https://api.themoviedb.org/3/movie
TMDB_API_KEY=your_tmdb_api_key_here
```

## 🚀 Usage

The CLI tool supports fetching different types of movies using the `-t` or `--type` option.

### Basic Usage

```bash
node index.js -t <movie_type>
```

### Available Movie Types

| Type | Description |
|------|-------------|
| `popular` | Currently popular movies |
| `top_rated` | Highest rated movies |
| `upcoming` | Movies coming soon to theaters |
| `now_playing` | Movies currently in theaters |

### Examples

**Get popular movies:**
```bash
node index.js -t popular
```

**Get top rated movies:**
```bash
node index.js -t top_rated
```

**Get upcoming movies:**
```bash
node index.js -t upcoming
```

**Get movies now playing:**
```bash
node index.js -t now_playing
```

### Sample Output

```
Fetching data from TMDB...

--- Top 10 Popular Movies ---

🎬 Title: Spider-Man: No Way Home
   Release Date: 2021-12-15
   Rating: 8.4/10
   Overview: Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero...

🎬 Title: The Batman
   Release Date: 2022-03-01
   Rating: 7.8/10
   Overview: In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family...
```

## 🎯 CLI Options

```bash
Usage: tmdb-cli-tool [options]

A CLI tool to interact with The Movie Database (TMDB) API

Options:
  -V, --version        output the version number
  -t, --type <type>    Type of movies to fetch: popular, top_rated, upcoming, now_playing
  -h, --help           display help for command
```

### Help Command

```bash
node index.js --help
```

### Version Command

```bash
node index.js --version
```

## ⚠️ Error Handling

The tool includes comprehensive error handling for various scenarios:

### Missing Movie Type
```bash
$ node index.js
Error: Please specify a movie type using the -t or --type option.
```

### Invalid Movie Type
```bash
$ node index.js -t invalid
Error: Invalid movie type. Valid types are: popular, top_rated, upcoming, now_playing
```

### API Errors
- **Invalid API Key**: Clear error message with status code
- **Network Issues**: Connection error handling
- **Rate Limiting**: API rate limit error handling

## 📁 Project Structure

```
tmdb-cli-tool/
├── configs/
│   └── env.js          # Environment configuration
├── index.js            # Main CLI application
├── package.json        # Dependencies and scripts
├── pnpm-lock.yaml     # Lock file
└── README.md          # Project documentation
```

## 🎓 Learning Objectives

This project demonstrates several important concepts for CLI and Node.js development:

1. **CLI Development** - Building command-line tools with Commander.js
2. **API Integration** - Making HTTP requests with Axios
3. **Environment Variables** - Secure API key management
4. **Error Handling** - Comprehensive error handling for different scenarios
5. **Data Formatting** - Clean output formatting and data presentation
6. **Asynchronous Programming** - Using async/await for API calls
7. **Command-line Arguments** - Parsing and validating user input
8. **Project Structure** - Organizing code with proper separation of concerns

## 🔧 Development Scripts

```bash
# Run the application
npm start

# Run with nodemon for development
npm run dev
```

## 🌟 Key Features Explained

### Command-line Interface
- Uses Commander.js for robust CLI argument parsing
- Provides help documentation and version information
- Validates user input and provides clear error messages

### API Integration
- Integrates with TMDB API v3
- Handles different movie categories through dynamic endpoint mapping
- Implements proper error handling for various API response scenarios

### Data Presentation
- Displays top 10 movies in a clean, readable format
- Includes essential movie information (title, date, rating, overview)
- Uses emojis and formatting for better user experience

### Security
- API keys stored in environment variables
- No sensitive information hardcoded in the source

## 🚀 Future Enhancements

- [ ] Add movie search functionality
- [ ] Include movie genres and cast information
- [ ] Add pagination support for browsing more results
- [ ] Implement caching to reduce API calls
- [ ] Add configuration file support
- [ ] Include movie poster URLs and display options
- [ ] Add filtering by release year or rating
- [ ] Implement interactive CLI mode
- [ ] Add export functionality (JSON, CSV)
- [ ] Include movie trailers and additional media

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Links

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Commander.js Documentation](https://github.com/tj/commander.js)
- [Axios Documentation](https://axios-http.com/)

## 📞 Contact

For any questions or suggestions, please feel free to reach out or create an issue in the repository.

---

**Happy Learning! 🎓**

This CLI tool is perfect for developers looking to understand command-line interface development, API integration, and Node.js fundamentals. Use it as a foundation to build more complex CLI applications!
