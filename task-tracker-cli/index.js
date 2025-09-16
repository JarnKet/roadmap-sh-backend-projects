// 1. เรียกใช้งานโมดูล 'fs' (File System) ของ Node.js
// เราใช้ 'fs/promises' เพื่อให้สามารถใช้ async/await ได้ ซึ่งทำให้โค้ดอ่านง่ายขึ้น
const fs = require('fs/promises');
const path = require('path');

// กำหนดที่อยู่ของไฟล์ JSON ที่จะใช้เก็บข้อมูล Tasks
const taskFilePath = path.join(__dirname, "tasks.json");

/**
 * ฟังก์ชันสำหรับอ่านข้อมูล Tasks จากไฟล์ tasks.json
 * @returns {Promise<Array>} Promise ที่จะ resolve เป็น Array ของ Tasks
 */

async function readTasks() {
    try {
        // ลองอ่านไฟล์

        const data = await fs.readFile(taskFilePath, "utf-8");
        // แปลงข้อมูลจาก JSON string เป็น JavaScript Array
        return JSON.parse(data);

    } catch (error) {
        // ถ้าเกิด error ขึ้น (เช่น ไฟล์ยังไม่มี)
        if (error.code === "ENOENT") {
            // ENOENT หมายถึง "Error NO ENTry" หรือ "File not found"
            // ถ้าไม่เจอไฟล์ ให้คืนค่าเป็น Array ว่างๆ กลับไป
            return [];
        } else {
            // ถ้าเป็น error อื่นๆ ให้โยน error นั้นออกไป
            throw error;
        }
    }
}

/**
 * ฟังก์ชันสำหรับเขียนข้อมูล Tasks ลงในไฟล์ tasks.json
 * @param {Array} tasks - Array ของ Tasks ที่ต้องการจะเขียนลงไฟล์
 * @returns {Promise<void>}
 */
async function writeTasks(tasks) {
    // แปลง JavaScript Array กลับเป็น JSON string
    // null, 2 คือการจัดรูปแบบ JSON ให้อ่านง่ายขึ้น (มี indent 2 spaces)

    const data = JSON.stringify(tasks, null, 2);

    await fs.writeFile(taskFilePath, data, "utf-8");
}


// ฟังก์ชันหลักที่จะทำงานเมื่อรันสคริปต์

async function main() {
    // process.argv คือ Array ที่เก็บ command-line arguments ทั้งหมด
    // [0] คือ 'node'
    // [1] คือ 'path/to/your/index.js'
    // เราสนใจตั้งแต่ index ที่ 2 เป็นต้นไป
    const [command, ...args] = process.argv.slice(2);

    switch (command) {
        case "add": {
            // ดึง description ของ task จาก argument ตัวแรก
            const description = args[0];

            // ตรวจสอบว่าผู้ใช้ใส่ description มาหรือไม่
            if (!description) {
                console.error("Error: Please provide a task description.");
                return;
            }

            // อ่าน tasks ทั้งหมดที่มีอยู่
            const tasks = await readTasks();

            // สร้าง ID ใหม่ที่ไม่ซ้ำ
            // หา ID สูงสุดที่มีอยู่ แล้วบวก 1
            const lastTask = tasks[tasks.length - 1];
            const newId = (lastTask ? lastTask.id : 0) + 1;

            // สร้าง object ของ task ใหม่
            const newTask = {
                id: newId,
                description: description,
                status: "todo", // สถานะเริ่มต้นคือ "todo"
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),

            }

            // เพิ่ม task ใหม่เข้าไปใน array
            tasks.push(newTask);

            // เขียน array ที่อัปเดตแล้วกลับลงไฟล์
            await writeTasks(tasks);

            console.log("Task added:", newTask);
            break;
        }

        case "list": {
            // อ่าน tasks ทั้งหมดที่มีอยู่
            const tasks = await readTasks();
            const filterStatus = args[0]; // 'done', 'todo', 'in-progress' หรือ undefined

            if (tasks.length === 0) {
                console.log("No tasks found.");
                return;
            }

            console.log("---Your Tasks---");

            const taskToDisplay = filterStatus ? tasks.filter(task => task.status === filterStatus) : tasks;

            if (taskToDisplay.length === 0) {
                console.log(`No tasks with status "${filterStatus}" found.`);
                return;
            }

            taskToDisplay.forEach(task => {
                let statusIcon = "";

                switch (task.status) {
                    case 'todo':
                        statusIcon = '📝'; // To-Do
                        break;
                    case 'in-progress':
                        statusIcon = '⏳'; // In Progress
                        break;
                    case 'done':
                        statusIcon = '✅'; // Done
                        break;
                }

                console.log(`${statusIcon} ${task.id}. [${task.status}] - ${task.description}`);
            });

            console.log('------------------');
            break;
        }

        case "update": {
            const taskId = parseInt(args[0], 10);
            const newDescription = args.slice(1).join(" ");

            if (isNaN(taskId) || !newDescription) {
                console.error("Error: Please provide a valid task ID and new description.");
                return;
            }

            const tasks = await readTasks();
            const taskIndex = tasks.findIndex(task => task.id === taskId);

            if (taskIndex === -1) {
                console.error(`Error: Task with ID ${taskId} not found.`);
                return;
            }

            // อัปเดตข้อมูล task
            tasks[taskIndex].description = newDescription;
            tasks[taskIndex].updatedAt = new Date().toISOString();

            await writeTasks(tasks);
            console.log(`Task ${taskId} updated:`, tasks[taskIndex]);
            break;
        }

        case 'delete': {
            const taskId = parseInt(args[0], 10);
            if (isNaN(taskId)) {
                console.error('Error: Please provide a valid task ID.');
                console.error('Usage: node index.js delete <id>');
                return;
            }
            const tasks = await readTasks();
            const newTasks = tasks.filter(task => task.id !== taskId);
            if (tasks.length === newTasks.length) {
                console.error(`Error: Task with ID ${taskId} not found.`);
                return;
            }
            await writeTasks(newTasks);
            console.log(`Task ${taskId} deleted successfully.`);
            break;
        }

        case "mark-done":
        case "mark-in-progress": {
            const taskId = parseInt(args[0], 10);

            if (isNaN(taskId)) {
                console.error("Error: Please provide a valid task ID.");
                console.error(`Usage : node index.js ${command} <id>`);
                return;
            }

            const tasks = await readTasks();
            const task = tasks.find(task => task.id === taskId);

            if (!task) {
                console.error(`Error: Task with ID ${taskId} not found.`);
                return;
            }

            // กำหนด status ใหม่จาก command ที่ใช้
            const newStatus = command === "mark-done" ? "done" : "in-progress";

            task.status = newStatus;
            task.updatedAt = new Date().toISOString();

            await writeTasks(tasks);
            console.log(`Task ${taskId} marked as ${newStatus}.`, task);
            break;

        }

        default:
            console.log(`
Unknown command: ${command || 'No command given.'}

Available commands:
  add "<description>"         - Add a new task
  list [status]               - List tasks (optional filter: todo, in-progress, done)
  update <id> "<description>" - Update a task's description
  delete <id>                 - Delete a task
  mark-done <id>              - Mark a task as done
  mark-in-progress <id>       - Mark a task as in-progress
      `);
            break;
    }
}

// เรียกใช้ฟังก์ชัน main
main().catch(console.error);