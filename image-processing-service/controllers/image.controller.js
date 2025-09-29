const {PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const sharp = require("sharp");

// Local Imports
const R2 = require("../configs/s3-client");
const Image = require("../models/image.model");
const {CLOUDFLARE_BUCKET_NAME, CLOUDFLARE_PUBLIC_URL} = require("../configs/env");


// Helper function to convert a stream to a buffer
// We need this to get the image from R2 into a format Sharp can use\
const streamToBuffer = (stream) => new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
})

// @desc Upload an image
// @route POST /api/images
// @access Private
exports.uploadImage = async (req, res) => {
    try {
        //     req.file is provided by multer middleware

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image",
            })
        }

        //     1. Create Unique File Name
        const uniqueFileName = crypto.randomBytes(16).toString("hex") + "-" + req.file.originalname;

        //     2. Prepare Command to Upload to R2
        const command = new PutObjectCommand({
            Bucket: CLOUDFLARE_BUCKET_NAME, Key: uniqueFileName, Body: req.file.buffer, //Buffer file from memory
            ContentType: req.file.mimetype,
        })

        //     3. Send file to R2
        await R2.send(command);

        //     4. Create URL for the uploaded image
        const imageUrl = `${CLOUDFLARE_PUBLIC_URL}/${uniqueFileName}`;

        //     5. Save image metadata to DB
        const image = await Image.create({
            user: req.user.id, filename: uniqueFileName, url: imageUrl, originalFilename: req.file.originalname,
        });

        //     6. Return response
        res.status(201).json({
            message: "Image uploaded successfully", image: image,
        })

    } catch (error) {
        console.error("Upload Image Error", error);
        res.status(500).json({
            message: "Internal Server Error", error: error.message, success: false,
        })
    }
}

// @desc    Apply transformations to an image
// @route   POST /api/images/:id/transform
// @access  Private
exports.transformImage = async (req, res) => {
    try {
        const {transformations} = req.body;

        if (!transformations) {
            return res.status(400).json({message: "Please provide transformations"});
        }

        // 1. Find original image metadata in DB
        const originalImage = await Image.findById(req.params.id);
        if (!originalImage) {
            return res.status(404).json({message: "Image not found"});
        }

        // Security check: Make sure the user owns the image
        if (originalImage.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({message: "You are not authorized to transform this image"});
        }

        //     2. Fetch the original image file from R2
        const getObjectCommand = new GetObjectCommand({
            Bucket: CLOUDFLARE_BUCKET_NAME, Key: originalImage.filename,
        });
        const response = await R2.send(getObjectCommand);
        const imageBuffer = await streamToBuffer(response.Body);


        //     3. Apply Transformations with Sharp
        let sharpInstance = sharp(imageBuffer);

        if (transformations.resize) {
            sharpInstance = sharpInstance.resize(transformations.resize.width, transformations.resize.height);
        }
        if (transformations.crop) {
            sharpInstance = sharpInstance.extract(transformations.crop); // crop expects { left, top, width, height }
        }
        if (transformations.rotate) {
            sharpInstance = sharpInstance.rotate(transformations.rotate);
        }
        if (transformations.filters?.grayscale) {
            sharpInstance = sharpInstance.grayscale();
        }
        if (transformations.filters?.sepia) {
            sharpInstance = sharpInstance.sepia();
        }
        if (transformations.format) {
            sharpInstance = sharpInstance.toFormat(transformations.format);
        }

        const transformedBuffer = await sharpInstance.toBuffer();

        //     4. Upload the new transformed image to R2
        const newFileName = `transformed-${crypto.randomBytes(16).toString('hex')}.${transformations.format || 'jpeg'}`;

        const putObjectCommand = new PutObjectCommand({
            Bucket: CLOUDFLARE_BUCKET_NAME,
            Key: newFileName,
            Body: transformedBuffer,
            ContentType: `image/${transformations.format || 'jpeg'}`,
        });

        await R2.send(putObjectCommand);


        //     5. Save metadata of transformed image to DB
        const newImageUrl = `${CLOUDFLARE_PUBLIC_URL}/${newFileName}`;
        const transformedImage = await Image.create({
            user: req.user.id,
            filename: newFileName,
            url: newImageUrl,
            originalFilename: originalImage.originalFilename,
        });

        //     6. Return response with new image URL
        res.status(201).json({
            message: "Image transformed successfully", image: transformedImage,
        })
    } catch (error) {
        console.error("Upload Image Error", error);
        res.status(500).json({
            message: "Internal Server Error", error: error.message, success: false,
        })
    }
}

// @desc    Get a paginated list of the user's images
// @route   GET /api/images
// @access  Private
exports.listUserImages = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 if not provided
        const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
        const skip = (page - 1) * limit;

        const images = await Image.find({user: req.user.id})
            .sort({createdAt: -1}) // Newest first
            .skip(skip)
            .limit(limit);

        const total = await Image.countDocuments({user: req.user.id});

        res.status(200).json({
            message: "Images fetched successfully", success: true, data: {
                images, page, totalPages: Math.ceil(total / limit), totalImages: total,
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error", error: error.message, success: false,
        })
    }
}

// @desc    Get a single image by its ID
// @route   GET /api/images/:id
// @access  Private
exports.getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).json({
                message: "Image not found",
            })
        }

        // Security check: Ensure the user owns this image
        if (image.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to view this image",
            })
        }

        res.status(200).json({
            message: "Image fetched successfully", success: true, data: image,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error", error: error.message, success: false,
        })
    }
}