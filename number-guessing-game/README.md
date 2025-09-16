# Number Guessing Game

A simple command-line number guessing game built with Node.js. The computer generates a random number between 1 and 100, and you have to guess it within a limited number of attempts based on the difficulty level you choose.

## Features

- **Multiple Difficulty Levels**:
  - Easy: 10 chances to guess
  - Medium: 5 chances to guess
  - Hard: 3 chances to guess
- **Interactive Command Line Interface**
- **Input Validation** - handles invalid inputs gracefully
- **Helpful Hints** - tells you if your guess is too high or too low
- **Attempt Tracking** - keeps track of how many attempts you've made

## Prerequisites

- Node.js (version 12.0 or higher)

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd number-guessing-game
```

2. Install dependencies (if any):
```bash
npm install
```

## Usage

Run the game using Node.js:

```bash
node index.js
```

### How to Play

1. When you start the game, you'll be welcomed and told that the computer is thinking of a number between 1 and 100
2. Choose your difficulty level:
   - Enter `1` for Easy (10 chances)
   - Enter `2` for Medium (5 chances)
   - Enter `3` for Hard (3 chances)
3. Start guessing! Enter your guess when prompted
4. The game will tell you if your guess is:
   - Too high (the number is less than your guess)
   - Too low (the number is greater than your guess)
   - Correct (you win!)
5. Keep guessing until you either:
   - Guess the correct number (you win!)
   - Run out of chances (game over)

### Example Gameplay

```
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.

Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)
Enter your choice: 2

Great! You have selected the Medium difficulty level.
You have 5 chances to guess the correct number.
Let's start the game!

Enter your guess (Chances left: 5): 50
Incorrect! The number is greater than 50.
Enter your guess (Chances left: 4): 75
Incorrect! The number is less than 75.
Enter your guess (Chances left: 3): 65
Congratulations! You guessed the correct number in 3 attempts.
```

## Game Rules

- You must enter a valid number between 1 and 100
- Invalid inputs (non-numbers) won't count against your chances
- The game ends when you either guess correctly or run out of chances
- Each difficulty level gives you a different number of attempts

## Project Structure

```
number-guessing-game/
├── index.js          # Main game logic
├── package.json      # Project configuration
└── README.md         # Project documentation
```

## Code Features

- Uses Node.js built-in `readline` module for user input
- Implements recursive function calls for game flow
- Clean separation of concerns with dedicated functions
- Proper input validation and error handling

## Contributing

Feel free to fork this project and submit pull requests for any improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add some improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the ISC License - see the package.json file for details.

## Author

Created as part of the [roadmap.sh](https://roadmap.sh) backend development projects.

---

**Enjoy the game! 🎮**
