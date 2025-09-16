# GitHub User Activity CLI

A simple command-line interface (CLI) tool that fetches and displays the recent public activity of any GitHub user using the GitHub API.

## 🚀 Features

- Fetch recent public activities of any GitHub user
- Display activities in a clean, readable format with emojis
- Support for various activity types:
  - 🚀 Push events (commits)
  - ✨ Repository creation
  - 🌿 Branch creation
  - 🐞 Issue creation
  - 🔃 Pull request creation
  - ⭐ Repository starring
- Error handling for invalid usernames
- No authentication required (uses public GitHub API)

## 📋 Prerequisites

- Node.js (version 18+ recommended for native fetch support)
- Internet connection to access GitHub API

## 🛠️ Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd github-user-activity
```

2. No additional dependencies required! The project uses Node.js built-in modules.

## 💻 Usage

Run the CLI tool with a GitHub username:

```bash
node index.js <username>
```

### Examples

```bash
# Get activity for GitHub user 'octocat'
node index.js octocat

# Get activity for any GitHub user
node index.js torvalds
node index.js gaearon
```

### Sample Output

```
🔍 กำลังดึงข้อมูลกิจกรรมสำหรับ: octocat...
✅ ดึงข้อมูลกิจกรรมสำเร็จ! กิจกรรมล่าสุดของ octocat:
- 🚀 Pushed 3 commit(s) to octocat/Hello-World
- ⭐ Starred microsoft/vscode
- 🌿 Created a new branch "feature/new-ui" in octocat/Hello-World
- 🐞 Opened a new issue in octocat/Hello-World
- 🔃 Opened a new pull request in octocat/Spoon-Knife
```

## 🔧 How It Works

1. **Command Line Parsing**: Uses `process.argv` to get the username from command line arguments
2. **GitHub API Integration**: Makes requests to `https://api.github.com/users/{username}/events`
3. **Data Processing**: Filters and formats the activity data into readable messages
4. **Display**: Shows the 15 most recent activities with appropriate emojis and descriptions

## 📁 Project Structure

```
github-user-activity/
├── index.js          # Main CLI application
├── package.json      # Project configuration
└── README.md         # This file
```

## 🔍 Supported Activity Types

| Event Type | Description | Example Output |
|------------|-------------|----------------|
| PushEvent | When commits are pushed to a repository | 🚀 Pushed 2 commit(s) to user/repo |
| CreateEvent | When a repository or branch is created | ✨ Created a new repository user/repo |
| IssuesEvent | When an issue is opened | 🐞 Opened a new issue in user/repo |
| PullRequestEvent | When a pull request is opened | 🔃 Opened a new pull request in user/repo |
| WatchEvent | When a repository is starred | ⭐ Starred user/repo |

## ⚠️ Error Handling

The tool handles various error scenarios:

- **Missing username**: Prompts user to provide a username
- **User not found**: Displays appropriate error message for non-existent users
- **API errors**: Handles GitHub API rate limits and other HTTP errors
- **No activity**: Informs when a user has no recent public activity

## 🌐 API Rate Limits

This tool uses the GitHub API without authentication, which has the following limits:
- 60 requests per hour per IP address
- Sufficient for personal use and learning purposes

For higher rate limits, you can modify the code to include a GitHub personal access token.

## 🎯 Learning Objectives

This project demonstrates:

- **Node.js CLI Development**: Using `process.argv` for command-line arguments
- **HTTP Requests**: Making API calls with the Fetch API
- **Async/Await**: Handling asynchronous operations
- **Error Handling**: Implementing try-catch blocks and proper error messages
- **Data Processing**: Filtering and formatting JSON responses
- **GitHub API Integration**: Working with real-world APIs

## 🤝 Contributing

This is a learning project! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- Add more activity types
- Implement output formatting options (JSON, table format)
- Add date filtering
- Include repository descriptions
- Add authentication support for higher rate limits
- Add unit tests

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 🙏 Acknowledgments

- [GitHub REST API](https://docs.github.com/en/rest) for providing the data
- [roadmap.sh](https://roadmap.sh) for the project inspiration

## 📚 Related Projects

This is part of a series of backend projects for learning Node.js:
- [Task Tracker CLI](../task-tracker-cli) - A command-line task management tool

---

**Happy Coding! 🚀**

> This project is perfect for beginners learning Node.js, API integration, and CLI development. Star ⭐ this repository if you find it helpful!
