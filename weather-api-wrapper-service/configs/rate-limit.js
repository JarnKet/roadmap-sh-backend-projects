const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 นาที
    max: 10, // จำนวน requests สูงสุด
    message: 'Too many requests from this IP, please try again after a minute.',
    standardHeaders: true, // ส่งข้อมูล rate limit ใน 'RateLimit-*' headers
    legacyHeaders: false, // ปิด 'X-RateLimit-*' headers
});

module.exports = limiter;