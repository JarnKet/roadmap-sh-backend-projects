// ฟังก์ชันสำหรับเริ่มต้นเซิร์ฟเวอร์
const {WebSocketServer} = require('ws');

function startServer() {
    // กำหนด port ที่จะให้เซิร์ฟเวอร์ทำงาน
    const PORT = 8080;

    // กำหนด port ที่จะให้เซิร์ฟเวอร์ทำงาน
    const wss = new WebSocketServer({port: PORT});

    // ใช้ Set ในการเก็บข้อมูล client ที่เชื่อมต่อทั้งหมด
    // Set เหมาะสมกว่า Array เพราะช่วยป้องกันการเก็บ client ซ้ำซ้อนและลบข้อมูลได้เร็วกว่า
    const clients = new Set();

    // Event listener: ทำงานเมื่อมี client ใหม่เชื่อมต่อเข้ามา
    wss.on("connection", (ws) => {
        console.log(`Client connected: ${ws}`);

        // เพิ่ม client ใหม่เข้าไปใน Set
        clients.add(ws);

        // Event listener: ทำงานเมื่อได้รับข้อความจาก client
        ws.on("message", (message) => {
            // แปลง message ที่อาจจะเป็น Buffer ให้เป็น string

            const messageString = message.toString();
            console.log(`Received message: ${messageString}`);

            // ส่งข้อความที่ได้รับไปยัง client ทุกคนที่เชื่อมต่ออยู่
            for (const client of clients) {
                // เช็คว่า client ยังอยู่ในสถานะเชื่อมต่อ (OPEN) ก่อนส่ง
                if (client.readyState === ws.OPEN) {
                    client.send(messageString);
                }
            }
        })

        // Event listener: ทำงานเมื่อ client ตัดการเชื่อมต่อ
        ws.on("close", () => {
            console.log(`Client disconnected: ${ws}`);
            // ลบ client ที่ตัดการเชื่อมต่อออกจาก Set
            clients.delete(ws);
        });

        // Event listener: จัดการข้อผิดพลาด
        ws.on("error", (error) => {
            console.error(`Error on client ${ws}: ${error}`);
        })
    });

    console.log(`🚀  Broadcast server started on ws://localhost:${PORT}`);

}


module.exports = {
    startServer,
}