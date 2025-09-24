const WebSocket = require('ws');
const readline = require('readline');

// ฟังก์ชันสำหรับเชื่อมต่อ client ไปยังเซิร์ฟเวอร์
function connectClient() {
    // ที่อยู่ของ WebSocket server
    const serverAddress = 'ws://localhost:8080';
    const ws = new WebSocket(serverAddress);

    // สร้าง interface สำหรับรับ input จาก user ใน terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    // Event listener: ทำงานเมื่อเชื่อมต่อกับเซิร์ฟเวอร์สำเร็จ
    ws.on("open", () => {
        console.log('✅  Connected to the broadcast server.');
        console.log('Type your message and press Enter to broadcast.');

        // พร้อมรับ input จาก user
        rl.prompt();
    });

    // Event listener: ทำงานเมื่อได้รับข้อความจากเซิร์ฟเวอร์
    ws.on('message', (message) => {
        // เคลียร์บรรทัดปัจจุบันก่อนแสดงข้อความใหม่ เพื่อไม่ให้ข้อความที่กำลังพิมพ์ทับซ้อนกัน

        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        console.log(`📢  Broadcast: ${message.toString()}`);

        // แสดง prompt ให้ user พิมพ์ต่อ
        rl.prompt();
    });

    // Event listener: ทำงานเมื่อการเชื่อมต่อถูกปิด
    ws.on("close", () => {
        console.log('❌  Disconnected from the server.');
        process.exit(0) // ออกจากโปรแกรม
    });

    // Event listener: จัดการข้อผิดพลาด
    ws.on("error", (error) => {
        console.error(`❗  Connection error: ${error.message}`);
        process.exit(1); // ออกจากโปรแกรมพร้อมรหัสข้อผิดพลาด
    });

    // Event listener: ทำงานเมื่อ user พิมพ์ข้อความแล้วกด Enter
    rl.on("line", (line) => {
        // ส่งข้อความที่ user พิมพ์ไปยังเซิร์ฟเวอร์
        ws.send(line)

        // แสดง prompt อีกครั้ง
        rl.prompt();
    })

}

module.exports = {
    connectClient,
}