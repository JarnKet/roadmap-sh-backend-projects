# Task Tracker CLI

A simple command-line interface (CLI) application for managing your tasks. Built with Node.js, this tool allows you to add, update, delete, and track the status of your tasks directly from the terminal.

## Features

- ✅ Add new tasks with descriptions
- 📝 List all tasks or filter by status
- ✏️ Update task descriptions
- 🗑️ Delete tasks
- 🔄 Mark tasks as "done" or "in-progress"
- 💾 Persistent storage using JSON file
- 🎨 Visual status indicators with emojis

## Installation

1. Clone this repository:
```bash
git clone <your-repository-url>
cd task-tracker-cli
```

2. Make sure you have Node.js installed on your system (version 12 or higher recommended)

3. The application is ready to use! No additional dependencies required.

## Usage

Run the application using Node.js with the following commands:

### Add a new task
```bash
node index.js add "Your task description"
```
Example:
```bash
node index.js add "Buy groceries"
node index.js add "Complete project documentation"
```

### List all tasks
```bash
node index.js list
```

### List tasks by status
```bash
node index.js list todo
node index.js list in-progress
node index.js list done
```

### Update a task
```bash
node index.js update <task-id> "New task description"
```
Example:
```bash
node index.js update 1 "Buy groceries and cook dinner"
```

### Delete a task
```bash
node index.js delete <task-id>
```
Example:
```bash
node index.js delete 1
```

### Mark task as done
```bash
node index.js mark-done <task-id>
```
Example:
```bash
node index.js mark-done 1
```

### Mark task as in-progress
```bash
node index.js mark-in-progress <task-id>
```
Example:
```bash
node index.js mark-in-progress 1
```

## Task Status

Tasks can have one of three statuses:
- **📝 todo** - Task is created but not started
- **⏳ in-progress** - Task is currently being worked on
- **✅ done** - Task is completed

## Data Storage

Tasks are stored in a `tasks.json` file in the project directory. Each task contains:
- `id` - Unique identifier
- `description` - Task description
- `status` - Current status (todo, in-progress, done)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Example Usage Session

```bash
# Add some tasks
node index.js add "Learn Node.js"
node index.js add "Build a CLI app"
node index.js add "Write documentation"

# List all tasks
node index.js list

# Output:
# ---Your Tasks---
# 📝 1. [todo] - Learn Node.js
# 📝 2. [todo] - Build a CLI app
# 📝 3. [todo] - Write documentation
# ------------------

# Mark a task as in-progress
node index.js mark-in-progress 1

# Mark a task as done
node index.js mark-done 2

# List only completed tasks
node index.js list done

# Update a task description
node index.js update 3 "Write comprehensive documentation"

# Delete a task
node index.js delete 1
```

## Error Handling

The application includes comprehensive error handling for:
- Missing task descriptions
- Invalid task IDs
- Non-existent tasks
- File system errors

## Project Structure

```
task-tracker-cli/
├── index.js        # Main application file
├── package.json    # Project configuration
├── README.md       # Project documentation
└── tasks.json      # Task data storage (created automatically)
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is licensed under the ISC License.

## Requirements

- Node.js 12.0.0 or higher

---

**Happy task tracking! 🚀**
