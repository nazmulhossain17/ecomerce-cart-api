const express = require('express');
const {getAllProducts, createProduct, updateProduct, deleteProduct} = require('../controller/product.controller')

const router = express.Router();

router.get("/", getAllProducts);
router.post("/create", createProduct);
router.put('/update/:id', updateProduct); // Update Product
router.delete('/delete/:id', deleteProduct); // Delete Product

module.exports = router;