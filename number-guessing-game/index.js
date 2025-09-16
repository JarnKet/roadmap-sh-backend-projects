// 1. นำเข้าโมดูล readline สำหรับการรับ input จาก command line

const readline = require('readline');

// สร้าง interface สำหรับการรับ-ส่งข้อมูล

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// ตัวแปรสำหรับเก็บค่าต่างๆ ของเกม
let secretNumber;
let chances;
let difficultyLevels = {
    '1': {name: "Easy", chances: 10},
    '2': {name: "Medium", chances: 5},
    '3': {name: "Hard", chances: 3}
}
let attempts = 0;

// ฟังก์ชันสำหรับเริ่มเกม
function startGame() {
    console.log("Welcome to the Number Guessing Game!");
    console.log("I'm thinking of a number between 1 and 100.");

    // สุ่มตัวเลข 1-100
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0; // รีเซ็ตจำนวนครั้งที่ทาย

    // เลือกระดับความยาก
    askForDifficulty();
}

function askForDifficulty() {
    console.log("\nPlease select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");

    rl.question('Enter your choice: ', (choice) => {
        if (difficultyLevels[choice]) {
            const selectedDifficulty = difficultyLevels[choice];
            chances = selectedDifficulty.chances;

            console.log(`\nGreat! You have selected the ${selectedDifficulty.name} difficulty level.`);
            console.log(`You have ${chances} chances to guess the correct number.\nLet's start the game!\n`);

            askForGuess();
        } else {
            console.log("Invalid choice. Please enter 1, 2, or 3.");
            askForDifficulty();
        }
    })
}

// ฟังก์ชันสำหรับถามให้ผู้ใช้ทายตัวเลข
function askForGuess() {
    // ตรวจสอบว่ายังมีโอกาสเหลือหรือไม่
    if (chances <= 0) {
        console.log(`Sorry, you've run out of chances. The correct number was ${secretNumber}.`);
        rl.close();
        return;
    }

    rl.question(`Enter your guess (Chances left: ${chances}): `, (guess) => {
        const userGuess = parseInt(guess, 10);
        attempts++
        chances--;

        // ตรวจสอบว่าเป็นตัวเลขที่ถูกต้องหรือไม่
        if (isNaN(userGuess)) {
            console.log("Please enter a valid number.");
            chances++; // คืนโอกาสให้เพราะใส่ข้อมูลผิด
            askForGuess();
        } else if (userGuess === secretNumber) {
            console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
            rl.close();
        } else if (userGuess > secretNumber) {
            console.log("Incorrect! The number is less than " + userGuess + ".");
            askForGuess();
        } else {
            console.log("Incorrect! The number is greater than " + userGuess + ".");
            askForGuess();
        }

    })

}


startGame();