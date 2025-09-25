const {Router} = require('express');

// Local Imports
const {authorize, isAdmin} = require('../middlewares/auth.middleware');
const {getProducts, createProduct, getProduct, deleteProduct, updateProduct} = require('../controllers/product.controller');

const productRouter = Router();

productRouter.route("/")
    .get(getProducts)
    .post(authorize, isAdmin,createProduct)

productRouter.route("/:id")
    .get(getProduct)
    .delete(authorize, isAdmin, deleteProduct)
    .put(authorize, isAdmin, updateProduct)

module.exports = productRouter;