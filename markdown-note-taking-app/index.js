// 1. นำเข้า Express
const express = require('express');

// Local Imports
const noteRouter = require('./routes/note.route');
const utilityRouter = require('./routes/utility.route');

// 2. สร้างอินสแตนซ์ของ Express
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 3. สร้าง Route พื้นฐานสำหรับทดสอบ
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.use('/api/v1/', utilityRouter);

app.use('/api/v1/notes', noteRouter);

//4. สั่งให้เซิร์ฟเวอร์เริ่มทำงาน (Listen) ที่พอร์ตที่กำหนด
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})