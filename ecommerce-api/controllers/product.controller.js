// Local Import
const db = require('../models');


// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    try {
        const {name, description, price, stock} = req.body;

        if (!name || !description || !price || !stock) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newProduct = await db.Product.create({name, description, price, stock});

        res.status(201).json({
            message: 'Product Created Successfully',
            success: true,
            data: newProduct,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}


// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const products = await db.Product.findAll();

        res.status(200).json({
            message: 'Successfully Found Products',
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}


// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await db.Product.findByPk(id);

        if (!product) {
            return res.status(404).json({message: "Product Not Found"});
        }

        res.status(200).json({
            message: 'Product Found Successfully',
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, description, price, stock} = req.body;

        if (!name || !description || !price || !stock) {
            return res.status(400).json({message: "All fields are required"});
        }

        const product = await db.Product.findByPk(id);

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message});
    }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await db.Product.findByPk(id);

        if (!product) {
            return res.status(404).json({message: "Product Not Found"});
        }

        await product.destroy();

        res.status(200).json({
            message: "Product Deleted Successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}