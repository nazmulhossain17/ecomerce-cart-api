const express = require('express');
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductById} = require('../controller/product.controller')

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);  // Get Product by ID
router.post("/create", createProduct);
router.put('/update/:id', updateProduct); // Update Product
router.delete('/delete/:id', deleteProduct); // Delete Product

module.exports = router;