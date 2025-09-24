#!/usr/bin/env node

const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const {startServer} = require('./server');
const {connectClient} = require('./client');

// กำหนดคำสั่งและตัวเลือกที่รองรับ
yargs(hideBin(process.argv))
    .command('start', 'Start the broadcast server', () => {
    }, (argv) => {
        // // เมื่อ user พิมพ์ 'start' ให้เรียกใช้ฟังก์ชัน startServer
        startServer();
    })
    // คำสั่ง 'connect'
    .command('connect', 'Connect as a broadcast client', () => {
    }, (argv) => {
        // เมื่อ user พิมพ์ 'connect' ให้เรียกใช้ฟังก์ชัน connectClient

        connectClient();
    })
    .demandCommand(1, 'You need to specify a command: start or connect') // บังคับให้มีการระบุคำสั่ง
    .help()
    .argv;
