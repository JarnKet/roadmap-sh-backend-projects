const fs =require('fs');
const path = require('path');

const {program} = require('commander');
const Table = require('cli-table3');
const {v4: uuidv4} = require('uuid');


// กำหนด path ไปยังไฟล์ข้อมูลของเรา
const expenseFilePath = path.join(__dirname, 'expenses.json');

/**
 * ฟังก์ชันสำหรับอ่านข้อมูลค่าใช้จ่ายจากไฟล์ JSON
 * @returns {Array} - Array ของ object ค่าใช้จ่าย
 */

const readExpenses = () => {
    try {
        // ตรวจสอบว่าไฟล์มีอยู่จริงหรือไม่
        if (!fs.existsSync(expenseFilePath)){
            return [];
        }

        const data = fs.readFileSync(expenseFilePath, 'utf-8');
        return JSON.parse(data); // แปลงข้อความ JSON เป็น JavaScript Array
    }catch (error) {
        console.error("Error Reading expense file: ",error);
        return [];
    }
}

/**
 * ฟังก์ชันสำหรับเขียนข้อมูลค่าใช้จ่ายลงในไฟล์ JSON
 * @param {Array} expenses - Array ของ object ค่าใช้จ่ายที่จะเขียนลงไฟล์
 */

const writeExpenses = (expenses) => {
    try {
        // แปลง JavaScript Array เป็นข้อความ JSON และจัดรูปแบบให้อ่านง่าย (indent 2 spaces)
        fs.writeFileSync(expenseFilePath, JSON.stringify(expenses, null, 2), 'utf-8');
    }catch (error) {
        console.error("Error writing expenses: ",error);
    }
}

// ----- ส่วนของฟังก์ชัน readExpenses และ writeExpenses อยู่ตรงนี้ -----

// กำหนดเวอร์ชันและรายละเอียดของโปรแกรม

program.name('Expense Tracker').description('A simple CLI tool to track your expenses').version("1.0.0");

// --- สร้างคำสั่ง 'add' ---
program.command("add")
    .description("Add a new expense")
    .requiredOption('-d, --description <type>', 'Description of the expense')
    .requiredOption('-a, --amount <number>', 'Amount of the expense')
    .action((options)=>{
        // อ่านข้อมูลเก่า

        const expenses = readExpenses();
        const amount = parseFloat(options.amount);

        // ตรวจสอบข้อมูลเบื้องต้น
        if (isNaN(amount) || amount <= 0) {
            console.error('Error: Amount must be a positive number.');
            return;
        }

        // สร้าง object expense ใหม่
        const newExpense = {
            id: uuidv4(), // สร้าง ID ที่ไม่ซ้ำกัน
            description: options.description,
            amount: amount,
            date: new Date().toISOString(), // เก็บวันที่ในรูปแบบมาตรฐาน
        }

        // เพิ่ม expense ใหม่เข้าไปใน array
        expenses.push(newExpense);

        // เขียนข้อมูลที่อัปเดตแล้วกลับลงไฟล์
        writeExpenses(expenses);

        console.log(`Expense added successfully (ID: ${newExpense.id})`);

    })


// --- สร้างคำสั่ง 'list' ---
program
    .command("list")
    .description("List all expenses")
    .action((options)=>{
        const expenses = readExpenses();

        if (expenses.length === 0){
            console.log(`No expenses found. Try adding some using the 'add' command.`);
            return;
        }

        // สร้างตารางด้วย cli-table3
        const table = new Table({
            head: ['ID', 'Date', 'Description', 'Amount'],
            colWidths: [40, 12, 50, 15], // กำหนดความกว้างของคอลัมน์
        })

        expenses.forEach((expense) => {
            table.push([
                expense.id,
                new Date(expense.date).toLocaleDateString('en-CA'), // Format YYYY-MM-DD
                expense.description,
                `$${expense.amount.toFixed(2)}` // Format ให้มีทศนิยม 2 ตำแหน่ง
            ]);
        })

        console.log(table.toString());
    })

// --- สร้างคำสั่ง 'delete' ---
program
    .command("delete")
    .description("Delete an expense by ID")
    .requiredOption('--id <id>', 'ID of the expense to delete')
    .action((options)=>{
        const expenses = readExpenses();

        // สร้าง array ใหม่โดยกรองรายการที่มี id ตรงกับที่ระบุไว้ออกไป
        const newExpenses = expenses.filter(expense => expense.id !== options.id);

        // ตรวจสอบว่ามีรายการถูกลบจริงหรือไม่ (โดยเช็คจากความยาวของ array)
        if (newExpenses.length === expenses.length){
            console.error(`Error: No expense found with ID ${options.id}`);
            return;
        }

        writeExpenses(newExpenses);
        console.log(`Expense with ID ${options.id} deleted successfully.`);
    })


// --- สร้างคำสั่ง 'update' ---
program
    .command("update")
    .description("Update an expense by ID")
    .requiredOption('--id <id>', 'ID of the expense to update')
    .option('-d, --description <type>', 'New description of the expense')
    .option('-a, --amount <number>', 'New amount of the expense')
    .action((options)=>{

        // ต้องระบุ description หรือ amount อย่างน้อยหนึ่งอย่าง
        if (!options.description && !options.amount){
            console.error('Error: Please provide a new description and/or amount to update.');
            return;
        }

        const expenses = readExpenses();

        // ค้นหา index ของรายการที่ต้องการแก้ไข
        const expenseIndex = expenses.findIndex(expense => expense.id === options.id);

        if (expenseIndex === -1){
            console.error(`Error: No expense found with ID ${options.id}`);
            return;
        }

        // อัปเดตข้อมูลถ้ามีการระบุ option นั้นๆ
        if (options.description){
            expenses[expenseIndex].description = options.description;
        }

        if (options.amount){
            const amount = parseFloat(options.amount);

            if (isNaN(amount) || amount <=0){
                console.error('Error: Amount must be a positive number.');
                return;
            }

            expenses[expenseIndex].amount = amount;
        }

        writeExpenses(expenses);
        console.log(`Expense with ID ${options.id} updated successfully.`);
    })

// --- สร้างคำสั่ง 'summary' ---
program
    .command("summary")
    .description("Summary the all expenses")
    .option("-m, --month <month>", "Month to filter (1-12)")
    .action((options)=>{
        let expenses = readExpenses();

        const currentYear = new Date().getFullYear();

        // ถ้ามีการระบุเดือน ให้กรองข้อมูลก่อน
        if (options.month){
            const month = parseInt(options.month);

            if (isNaN(month) || month < 1 || month > 12)  {
                console.error('Error: Month must be a number between 1 and 12.');
                return;
            }

            expenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);

                // กรองเอาเฉพาะปีปัจจุบัน และเดือนที่ระบุ (getMonth() คืนค่า 0-11 จึงต้อง +1)
                return expenseDate.getFullYear() === currentYear && (expenseDate.getMonth() + 1) === month;
            });

            const monthName = new Date(currentYear, month - 1).toLocaleDateString('en-US', {
                month: 'long'
            });

            console.log(`Summary for ${monthName} ${currentYear}:`);
        }
        else{
            console.log(`Summary for all time:`);
        }

        if (expenses.length === 0){
            console.log('No expenses found for the specified period.');
            return;
        }

        // ใช้ reduce เพื่อคำนวณผลรวม
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

        console.log(`Total expenses: $${total.toFixed(2)}`);
    })

program.parse(process.argv)

