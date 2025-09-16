# Expense Tracker CLI

A powerful command-line interface (CLI) application for tracking personal expenses. Built with Node.js, this tool helps you manage your finances by allowing you to add, list, update, delete, and summarize your expenses with ease.

## 🚀 Features

- **Add Expenses**: Record new expenses with description and amount
- **List All Expenses**: View all expenses in a beautiful table format
- **Update Expenses**: Modify existing expense details
- **Delete Expenses**: Remove expenses by ID
- **Monthly Summary**: Get expense summaries for specific months or all-time
- **Data Persistence**: All data is stored locally in JSON format
- **Input Validation**: Ensures data integrity with proper validation
- **Unique IDs**: Each expense gets a unique UUID for easy identification

## 📋 Prerequisites

- Node.js (version 14+ recommended)
- npm (Node Package Manager)

## 🛠️ Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

The project uses the following dependencies:
- `commander` - Command-line interface framework
- `cli-table3` - Beautiful table formatting
- `uuid` - Generate unique identifiers

## 💻 Usage

### Adding an Expense
```bash
node index.js add --description "Lunch at restaurant" --amount 15.50
# or using short flags
node index.js add -d "Coffee" -a 4.25
```

### Listing All Expenses
```bash
node index.js list
```

### Updating an Expense
```bash
# Update description only
node index.js update --id <expense-id> --description "Updated description"

# Update amount only
node index.js update --id <expense-id> --amount 20.00

# Update both description and amount
node index.js update --id <expense-id> -d "New description" -a 25.75
```

### Deleting an Expense
```bash
node index.js delete --id <expense-id>
```

### Getting Summary
```bash
# All-time summary
node index.js summary

# Monthly summary (for current year)
node index.js summary --month 3  # March summary
node index.js summary -m 12      # December summary
```

## 📊 Sample Output

### List Command
```
┌────────────────────────────────────────┬────────────┬──────────────────────────────────────────────────┬───────────────┐
│ ID                                     │ Date       │ Description                                      │ Amount        │
├────────────────────────────────────────┼────────────┼──────────────────────────────────────────────────┼───────────────┤
│ a1b2c3d4-e5f6-7890-abcd-ef1234567890   │ 2025-09-16 │ Lunch at restaurant                              │ $15.50        │
├────────────────────────────────────────┼────────────┼──────────────────────────────────────────────────┼───────────────┤
│ b2c3d4e5-f6g7-8901-bcde-f23456789012   │ 2025-09-16 │ Coffee                                           │ $4.25         │
└────────────────────────────────────────┴────────────┴──────────────────────────────────────────────────┴───────────────┘
```

### Summary Command
```bash
$ node index.js summary
Summary for all time:
Total expenses: $127.45

$ node index.js summary --month 9
Summary for September 2025:
Total expenses: $89.20
```

## 🔧 How It Works

### Data Storage
- Expenses are stored in a local `expenses.json` file
- Each expense contains:
  - `id`: Unique UUID identifier
  - `description`: Text description of the expense
  - `amount`: Numeric amount (validated to be positive)
  - `date`: ISO timestamp of when the expense was created

### Command Structure
The application uses the Commander.js framework to handle CLI commands with proper argument parsing and validation.

### File Operations
- **Reading**: Safe JSON parsing with error handling
- **Writing**: Formatted JSON output with 2-space indentation
- **Validation**: Input validation for amounts and required fields

## 📁 Project Structure

```
expense-tracker/
├── index.js          # Main CLI application
├── package.json      # Project configuration and dependencies
├── expenses.json     # Data storage (auto-created)
└── README.md         # This file
```

## ⚠️ Error Handling

The application handles various error scenarios:

- **Invalid amounts**: Must be positive numbers
- **Missing required fields**: Description and amount are required for adding
- **Invalid expense IDs**: Proper error messages for non-existent expenses
- **Invalid month values**: Must be between 1-12
- **File I/O errors**: Graceful handling of file read/write operations
- **JSON parsing errors**: Safe handling of corrupted data files

## 🎯 Learning Objectives

This project demonstrates:

- **Node.js CLI Development**: Using Commander.js for robust command-line interfaces
- **File System Operations**: Reading and writing JSON data with Node.js `fs` module
- **Data Validation**: Input validation and error handling
- **UUID Generation**: Using unique identifiers for data records
- **Table Formatting**: Creating beautiful console output with cli-table3
- **Date Handling**: Working with JavaScript Date objects and ISO strings
- **Array Methods**: Using `filter`, `findIndex`, and `reduce` for data manipulation

## 🤝 Contributing

This is a learning project! Contributions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions

- Add category support for expenses
- Implement data export (CSV, Excel)
- Add budget tracking and alerts
- Create expense visualization charts
- Add data backup and restore functionality
- Implement recurring expense support
- Add expense search and filtering
- Create a web interface
- Add multi-currency support

## 📝 Commands Reference

| Command | Description | Required Options | Optional Options |
|---------|-------------|------------------|------------------|
| `add` | Add a new expense | `-d, --description`, `-a, --amount` | None |
| `list` | List all expenses | None | None |
| `update` | Update an expense | `--id` | `-d, --description`, `-a, --amount` |
| `delete` | Delete an expense | `--id` | None |
| `summary` | Show expense summary | None | `-m, --month` |

## 🐛 Troubleshooting

### Common Issues

1. **"No expenses found" message**
   - Solution: Add some expenses first using the `add` command

2. **"Error: Amount must be a positive number"**
   - Solution: Ensure the amount is a valid positive number

3. **"No expense found with ID"**
   - Solution: Use `list` command to see valid expense IDs

4. **File permission errors**
   - Solution: Ensure you have write permissions in the project directory

## 📜 License

This project is open source and available under the [ISC License](LICENSE).

## 🙏 Acknowledgments

- [Commander.js](https://github.com/tj/commander.js/) for excellent CLI framework
- [cli-table3](https://github.com/cli-table/cli-table3) for beautiful table formatting
- [UUID](https://github.com/uuidjs/uuid) for unique identifier generation
- [roadmap.sh](https://roadmap.sh) for the project inspiration

## 📚 Related Projects

This is part of a series of backend projects for learning Node.js:
- [GitHub User Activity CLI](../github-user-activity) - Fetch GitHub user activities
- [Task Tracker CLI](../task-tracker-cli) - Command-line task management

---

**Happy Expense Tracking! 💰**

> Perfect for learning Node.js CLI development, file operations, and data management. Star ⭐ this repository if it helps you manage your finances!
