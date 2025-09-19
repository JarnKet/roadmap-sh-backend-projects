const {Router} = require('express');

// Local Imports
const upload = require('../configs/multer');
const {
    createNote,
    getAllNotes,
    getNote,
    uploadNote,
    updateNote,
    deleteNote
} = require('../controllers/note.controller');

const noteRouter = Router();


noteRouter.route('/')
    .get(getAllNotes)
    .post(createNote)

noteRouter.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)


noteRouter.post('/upload', upload.single("noteFile"), uploadNote);

module.exports = noteRouter;