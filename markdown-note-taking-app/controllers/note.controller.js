const fs = require('fs/promises');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const {marked} = require('marked');

// Create Note

exports.createNote = async (req, res) => {
    try {
        //     1. Get data from the request body
        const {content} = req.body;

        //     2. Check if content is provided
        if (!content) {
            return res.status(400).json({message: "Content is required", success: false});
        }

        //     3. Create Unique ID
        const noteId = uuidv4();
        const filename = `${noteId}.md`;
        const filePath = path.join(__dirname, '../notes', filename);


        //     4. Write Markdown content to a file
        await fs.writeFile(filePath, content, 'utf8');

        //     5. Send Back Response
        res.status(201).json({
            message: "Note created successfully", success: true, data: {
                noteId
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

// Get All Notes
exports.getAllNotes = async (req, res) => {
    try {
        const noteDirectory = path.join(__dirname, '../notes');

        //     1. Read Files
        const files = await fs.readdir(noteDirectory);

        //     2. Find Markdown Files
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        //     3. Read Content of Markdown Files
        const notes = await Promise.all(markdownFiles.map(async file => {
            const filePath = path.join(noteDirectory, file);
            const content = await fs.readFile(filePath, 'utf8');
            return {
                noteId: file.replace('.md', ''),
                content
            };
        }));

        // 4. Send Back Response
        res.status(200).json({
            message: "Notes fetched successfully", success: true, data: {
                notes
            }
        });

    } catch (error) {
        console.log("Error Fetching Data:  ", error);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
}

// Get One Note
exports.getNote = async (req, res) => {
    try {

        //   1. Get Note ID from Request Parameters
        const {id} = req.params;
        const filepath = path.join(__dirname, '../notes', `${id}.md`);

        //   2. Read File Content
        const markdownContent = await fs.readFile(filepath, 'utf8');

        //   3. Convert Markdown to HTML
        const htmlContent = marked(markdownContent);

        res.status(200).send(htmlContent)

    } catch (error) {
        // A special check for "file not found" errors
        if (error.code === 'ENOENT') {
            return res.status(404).json({message: 'Note not found'});
        }
        // For all other errors
        console.error('Error fetching note by ID:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

// Upload Note

exports.uploadNote = async (req, res) => {
    // Multer has already saved the file by the time this function is called.
    // Details about the saved file are in req.file.
    if (!req.file) {
        return res.status(400).json({message: "No file uploaded", success: false});
    }

    // The filename is the UUID + .md. We'll strip the extension to get the ID.
    const noteId = req.file.filename.replace('.md', '');

    res.status(201).json({
        message: 'File uploaded and note created successfully!',
        noteId: noteId
    });
}

// Update Note
exports.updateNote = async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        const filePath = path.join(__dirname, '..', 'notes', `${id}.md`);

        // 1. Check for content in the request body
        if (!content) {
            return res.status(400).json({message: 'Content is required for update'});
        }

        // 2. Overwrite the existing file with new content
        // fs.writeFile will replace the file if it exists.
        await fs.writeFile(filePath, content, 'utf8');

        res.status(200).json({message: 'Note updated successfully', noteId: id});
    } catch (error) {
        // We can check for 'ENOENT' here too, but writeFile doesn't throw it
        // if the directory exists. For a strict PUT, you might check if the file
        // exists first, but for this project, overwriting is sufficient.
        console.error('Error updating note:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

// Delete Note
exports.deleteNote = async (req, res) => {
    try {
        //     1. Get Note ID from Request Parameters
        const {id} = req.params;
        const filepath = path.join(__dirname, '../notes', `${id}.md`);


        // 2. Delete the file
        await fs.unlink(filepath);

        // 3. Send Back Response
        res.status(200).json({message: "Note deleted successfully", success: true});

    } catch (error) {
        // If the file doesn't exist, fs.unlink throws an 'ENOENT' error
        if (error.code === 'ENOENT') {
            return res.status(404).json({message: 'Note not found'});
        }
        // Handle other potential errors
        console.error('Error deleting note:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}