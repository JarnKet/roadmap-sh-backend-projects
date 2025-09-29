const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // สร้างความสัมพันธ์ไปยัง User Model
    },
    filename: { // ชื่อไฟล์ที่ไม่ซ้ำกันที่เราสร้างขึ้นสำหรับเก็บใน R2
        type: String,
        required: true,
    },
    url: { // URL สาธารณะสำหรับเข้าถึงรูปภาพ
        type: String,
        required: true,
    },
    originalFilename: { // ชื่อไฟล์ดั้งเดิมจากเครื่องผู้ใช้
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Image', ImageSchema);