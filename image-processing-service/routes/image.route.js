const {Router} = require('express');
const multer = require('multer');

// Local Imports
const {uploadImage, transformImage, listUserImages, getImageById} = require("../controllers/image.controller");
const {authorize} = require("../middlewares/auth.middleware");

const imageRouter = Router();

// Setup Multer store file in memory as Buffer
const upload = multer({storage: multer.memoryStorage()});

// POST /api/images
// - authorize: Check if the user is authenticated
// - upload.single('image'): Handle single file upload with field name 'image'
imageRouter.route("/")
    .get(authorize, listUserImages)
    .post(authorize, upload.single("image"), uploadImage);

imageRouter.get("/:id", authorize, getImageById)
imageRouter.post("/:id/transform", authorize, transformImage);

module.exports = imageRouter;