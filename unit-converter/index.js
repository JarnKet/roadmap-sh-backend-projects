// 1. นำเข้า express

const express = require("express");
const path = require("path");

const lengthRouter = require("./routes/length.route");
const temperatureRouter = require("./routes/temperature.route");
const weightRouter = require("./routes/weight.route");

// 2. สร้าง instance ของ express app
const app = express();
const PORT = 3000;

// 3. ตั้งค่า EJS เป็น view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // บอกให้ express หาไฟล์ .ejs ในโฟลเดอร์ views

// 4. Middleware สำหรับอ่านข้อมูลจากฟอร์ม
// ทำให้เราสามารถเข้าถึงข้อมูลที่ส่งมาจากฟอร์มผ่าน req.body
// *** สำคัญ: ต้องตั้งค่าก่อนที่จะใช้ routes ***
app.use(express.urlencoded({ extended: true }));

// 5. ตั้งค่า routes
app.use("/length", lengthRouter); // ใช้ lengthRouter สำหรับเส้นทาง /length
app.use("/temperature", temperatureRouter); // ใช้ temperatureRouter สำหรับเส้นทาง /temperature
app.use("/weight", weightRouter); // ใช้ weightRouter สำหรับเส้นทาง /weight

// 6. สร้าง Route พื้นฐาน (เราจะมาเพิ่มตรงนี้ทีหลัง)
app.get("/", (req, res) => {
    res.send(
        '<h1>Unit Converter Home</h1><a href="/length">Length</a> | <a href="/weight">Weight</a> | <a href="/temperature">Temperature</a>'
    );
});

// 7. เริ่มรันเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
