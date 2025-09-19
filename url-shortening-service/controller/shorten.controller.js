const {nanoid} = require('nanoid');

// Local Imports
const pool = require('../configs/database');

exports.shortenUrl = async (req, res) => {
    // 1. รับ originalUrl จาก request body
    const {url: originalUrl} = req.body;

    // 2. ตรวจสอบว่ามี URL ส่งมาหรือไม่
    if (!originalUrl) {
        return res.status(400).json({message: "URL is required", success: false});
    }

    try {
        // 3. สร้าง shortCode ที่ไม่ซ้ำกัน (ใช้ nanoid ขนาด 6 ตัวอักษร)
        const shortCode = nanoid(6);

        // 4. บันทึกข้อมูลลงในฐานข้อมูล
        const [result] = await pool.execute(
            'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
            [originalUrl, shortCode]
        )

        // 5. ดึงข้อมูลที่เพิ่งสร้างขึ้นมาใหม่เพื่อส่งกลับไป
        const [rows] = await pool.execute(
            'SELECT * FROM urls WHERE id = ?', [result.insertId]
        )

        //     6. Send the shortened URL back to the client
        res.status(201).json({message: "URL shortened successfully", success: true, data: rows[0]});

    } catch (error) {
        console.error(error);
        // จัดการกรณี short_code ซ้ำกัน (ซึ่งโอกาสเกิดน้อยมากกับ nanoid)
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({error: 'Short code already exists, please try again.'});
        }

        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

exports.getShortenedUrl = async (req, res) => {
    // 1. ดึง shortCode จาก URL parameters
    const {shortCode} = req.params;

    try {
        //     2. ค้นหาข้อมูลในฐานข้อมูล
        const [rows] = await pool.execute(
            'SELECT * FROM urls WHERE short_code = ?',
            [shortCode]
        );

        // 3. ตรวจสอบว่าเจอข้อมูลหรือไม่
        if (rows.length === 0) {
            return res.status(404).json({message: "URL not found", success: false});
        }

        // 4. Send Data without access_count
        const {access_count, ...data} = rows[0];
        res.status(200).json({message: "URL found", success: true, data});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

exports.redirectOriginalUrl = async (req, res) => {
    const {shortCode} = req.params;

    try {
        // 1. ค้นหา shortCode ในฐานข้อมูล
        const [rows] = await pool.execute(
            'SELECT * FROM urls WHERE short_code = ?',
            [shortCode]
        );

        if (rows.length === 0) {
            return res.status(404).json({message: "URL not found", success: false});
        }

        const originalUrl = rows[0].original_url;

        // 2. อัปเดต access_count +1 (ทำใน background ไม่ต้องรอให้เสร็จ)
        pool.execute(
            'UPDATE urls SET access_count = access_count + 1 WHERE short_code = ?',
            [shortCode]
        )

        // 3. ทำการ Redirect
        res.redirect(301, originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

exports.getShortenedUrlStat = async (req, res) => {
    // 1. ดึง shortCode จาก URL parameters
    const {shortCode} = req.params;

    try {
        //     2. ค้นหาข้อมูลในฐานข้อมูล
        const [rows] = await pool.execute(
            'SELECT * FROM urls WHERE short_code = ?',
            [shortCode]
        );

        // 3. ตรวจสอบว่าเจอข้อมูลหรือไม่
        if (rows.length === 0) {
            return res.status(404).json({message: "URL not found", success: false});
        }

        // 4. Response the data
        res.status(200).json({message: "URL found", success: true, data: rows[0]});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

exports.updateShortenedUrl = async (req, res) => {
    const {shortCode} = req.params;
    const {url: newOriginalUrl} = req.body;

    // ตรวจสอบว่ามี URL ใหม่ส่งมาหรือไม่
    if (!newOriginalUrl) {
        return res.status(400).json({message: "URL is required", success: false});
    }

    try {
        // 1. อัปเดตข้อมูลในฐานข้อมูล
        const [results] = await pool.execute(
            'UPDATE urls SET original_url = ? WHERE short_code = ?',
            [newOriginalUrl, shortCode]
        )

        // 2. ตรวจสอบว่ามีการอัปเดตเกิดขึ้นจริงหรือไม่
        if (results.affectedRows === 0) {
            return res.status(404).json({message: "URL not found", success: false});
        }

        //     3. ดึงข้อมูลล่าสุดหลังอัปเดตเพื่อส่งกลับไป
        const [rows] = await pool.execute(
            'SELECT * FROM urls WHERE short_code = ?',
            [shortCode]
        );

        res.status(200).json({message: "URL updated successfully", success: true, data: rows[0]});
    } catch (error) {

    }
}

exports.deleteShortenedUrl = async (req, res) => {
    const {shortCode} = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM urls WHERE short_code = ?',
            [shortCode]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({message: "URL not found", success: false});
        }

        res.status(200).json({message: "URL deleted successfully", success: true});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}