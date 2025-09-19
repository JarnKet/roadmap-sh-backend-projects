#!/usr/bin/env node

// ... ส่วนที่เหลือของโค้ด ...

const fs = require('fs');
const path = require('path');
const express = require('express');
const axios = require('axios');
const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');

// กำหนดตำแหน่งไฟล์สำหรับเก็บ Cache
const CACHE_FILE_PATH = path.join(__dirname, 'cache.json');

const argv = yargs(hideBin(process.argv))
    .option('port', {
        alias: 'p', describe: 'Port number to run the server on', type: 'number', default: 3000
    })
    .option('origin', {
        alias: 'o', describe: 'Origin URL to proxy requests to', type: 'string',
    })
    .option('clear-cache', {
        describe: 'Clear the cache', type: 'boolean',
    })
    .help().argv;

/**
 * ฟังก์ชันสำหรับโหลด Cache จากไฟล์ JSON
 * @returns {Map} อ็อบเจกต์ Map ของ Cache
 */

function loadCache() {
    if (fs.existsSync(CACHE_FILE_PATH)) {
        const fileContent = fs.readFileSync(CACHE_FILE_PATH, 'utf-8');
        // แปลงจาก array ที่จัดเก็บใน JSON กลับมาเป็น Map
        return new Map(JSON.parse(fileContent));
    }

    return new Map();
}

/**
 * ฟังก์ชันสำหรับบันทึก Cache ลงไฟล์ JSON
 * @param {Map} cache - อ็อบเจกต์ Map ของ Cache ที่จะบันทึก
 */

function saveCache(cache) {
    // แปลงจาก Map เป็น Array of [key, value] เพื่อให้ JSON.stringify ทำงานได้
    const cacheArray = Array.from(cache.entries());

    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(cacheArray), 'utf-8');
}


/**
 * ฟังก์ชันสำหรับล้าง Cache โดยการลบไฟล์
 */
function clearCache() {
    if (fs.existsSync(CACHE_FILE_PATH)) {
        fs.unlinkSync(CACHE_FILE_PATH);
        console.log('Cache cleared successfully.');
    } else {
        console.log('No cache to clear.')
    }
}


// Logic หลักในการรันโปรแกรม
if (argv['clear-cache']) {
    clearCache();
} else if (argv.port && argv.origin) {
    startProxyServer(argv.port, argv.origin);
} else {
    console.log('Usage: node index.js --port <port> --origin <origin>');
}

/**
 * ฟังก์ชันสำหรับเริ่มการทำงานของ Proxy Server
 * @param {number} port - พอร์ตที่จะรันเซิร์ฟเวอร์
 * @param {string} origin - URL ของเซิร์ฟเวอร์ปลายทาง
 */
function startProxyServer(port, origin) {
    const app = express();
    const cache = loadCache();

// Middleware ที่จะทำงานกับทุกๆ request ที่เข้ามา
    app.use('/', async (req, res) => {
        // สร้าง Key สำหรับ Cache จาก Method และ URL
        const cacheKey = `${req.method} ${req.originalUrl}`;

        // 1. ตรวจสอบว่ามีข้อมูลใน Cache หรือไม่
        if (cache.has(cacheKey)) {
            console.log('✅ Cache hit for:', cacheKey);
            const cachedResponse = cache.get(cacheKey);

            //     ตั้งค่า Header และส่งข้อมูลจาก Cache กลับไป
            res.setHeader('X-Cache', 'HIT');
            return res.status(cachedResponse.status).send(cachedResponse.data)
        }

        // 2. ถ้าไม่มีใน Cache (Cache MISS)
        try{
            console.log('❌ Cache MISS for:', cacheKey);
            const targetUrl = `${origin}${req.originalUrl}`;

            // ส่ง request ต่อไปยังเซิร์ฟเวอร์ปลายทาง
            const response = await axios({
                method: req.method,
                url: targetUrl,
                data: req.body,
                // ส่งต่อ headers บางส่วนไปด้วย (ถ้ามี)
                headers:{
                    'Authorization': req.headers['authorization'] || '',
                }
            })

            // สร้างข้อมูลที่จะเก็บลง Cache
            const responseToCache = {
                status: response.status,
                header: response.headers,
                data: response.data
            }

            // 3. บันทึกผลลัพธ์ลง Cache และไฟล์
            cache.set(cacheKey, responseToCache);
            saveCache(cache);

            // ตั้งค่า Header และส่งข้อมูลที่ได้จาก Origin Server กลับไป
            res.setHeader('X-Cache', 'MISS');
            res.status(response.status).json(response.data);
        }catch (error) {
            console.error("Error fetching data from origin:", error.message);

            const status = error.response ? error.response.status : 502; // Bad Gateway
            const data = error.response ? error.response.data : 'Error fetching data from origin';

            res.status(status).json({
                error: data
            });
        }
    });

    app.listen(port, () => {
        console.log(`Caching proxy server started on http://localhost:${port}`);
        console.log(`Forwarding requests to: ${origin}`);
    })
}