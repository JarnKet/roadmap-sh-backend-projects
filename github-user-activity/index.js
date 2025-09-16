// 1. รับค่าจาก Command Line
// process.argv เป็น array ที่เก็บ argument ทั้งหมดที่ส่งเข้ามา
// [0] คือ path ของ node
// [1] คือ path ของไฟล์ script ที่กำลังรัน
// [2] คือ argument ตัวแรกที่เราส่งเข้ามา (username)


const username = process.argv[2];

// 2. ตรวจสอบว่าผู้ใช้ได้ใส่ username มาหรือไม่

if (!username) {
    console.error('Please enter a username');
    console.log('Example: node index.js octocat');
    process.exit(1); // ออกจากโปรแกรมด้วยสถานะ 1 (แสดงว่ามีข้อผิดพลาด)

}


// 3. ฟังก์ชันสำหรับดึงข้อมูลกิจกรรมของผู้ใช้จาก GitHub API
async function fetchActivity(username) {
    const url = `https://api.github.com/users/${username}/events`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`User ${username} not found`);
            }
            throw new Error("Error from GitHub API", response.statusText);
        }

        const events = await response.json();
        return events;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// 4. แสดงผลข้อมูลกิจกรรม
function displayActivity(events) {
    // กรองเอาเฉพาะ 15 กิจกรรมล่าสุด

    events.slice(0, 15).forEach((event) => {
        let message = "";

        const repoName = event.repo.name;

        switch (event.type) {
            case "PushEvent":
                const commitCount = event.payload.commits.length;
                message = `- 🚀 Pushed ${commitCount} commit(s) to ${repoName}`;
                break;
            case 'CreateEvent':
                if (event.payload.ref_type === 'repository') {
                    message = `- ✨ Created a new repository ${repoName}`;
                } else if (event.payload.ref_type === 'branch') {
                    message = `- 🌿 Created a new branch "${event.payload.ref}" in ${repoName}`;
                }
                break;
            case 'IssuesEvent':
                if (event.payload.action === 'opened') {
                    message = `- 🐞 Opened a new issue in ${repoName}`;
                }
                break;
            case 'PullRequestEvent':
                if (event.payload.action === 'opened') {
                    message = `- 🔃 Opened a new pull request in ${repoName}`;
                }
                break;
            case 'WatchEvent':
                if (event.payload.action === 'started') {
                    message = `- ⭐ Starred ${repoName}`;
                }
                break;
            default:
                // เราจะไม่แสดง event ประเภทอื่นๆ ที่เราไม่สนใจ
                break;
        }

        if (message) {
            console.log(message)
        }
    })
}

// ฟังก์ชันหลักที่จะทำงานทั้งหมด
async function main() {
    console.log(`🔍 กำลังดึงข้อมูลกิจกรรมสำหรับ: ${username}...`);

    const events = await fetchActivity(username);

    if (events && events.length > 0) {
        console.log(`✅ ดึงข้อมูลกิจกรรมสำเร็จ! กิจกรรมล่าสุดของ ${username}:`);

        displayActivity(events);
    } else if (events) {
        console.log(`\n🤷 ไม่พบกิจกรรมล่าสุดสำหรับผู้ใช้ ${username}`);
    }

}

// เริ่มการทำงานของโปรแกรม
main();