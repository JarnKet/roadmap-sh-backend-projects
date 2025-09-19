const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');

// --- Multer Configuration ---
const storage = multer.diskStorage({
    // 2. Set the destination for uploaded files
    destination: (req, file, cb) => {
        cb(null, 'notes/');

    },

    // 3. Set the filename to be a unique ID
    filename: (req, file, cb) => {
        // We use a UUID to prevent name conflicts, just like before
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
});

const filerFile = (req, file, cb) => {
    // 4. Accept only markdown files

    if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
        cb(null, true);
    }else{
        cb(new Error('Only .md files are allowed!'), false);
    }
}

// 5. Initialize Multer with our configuration
const upload = multer({
    storage,
    fileFilter: filerFile,
})


module.exports = upload;