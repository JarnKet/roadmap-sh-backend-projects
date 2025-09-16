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

