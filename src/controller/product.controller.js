const db = require("../db/dbConfig");


// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await db('products').select();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await db('products').where({ id }).first();
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create Product
const createProduct = async (req, res) => {
    const { name, description, price, quantity, imageUrl } = req.body;

    try {
        const [productId] = await db('products').insert({ name, description, price, quantity, imageUrl });
        res.status(201).json({ productId, message: 'Product created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, imageUrl } = req.body;

  try {
      const updated = await db('products')
          .where({ id })
          .update({ name, description, price, quantity, imageUrl });

      if (updated) {
          res.status(200).json({ message: 'Product updated successfully' });
      } else {
          res.status(404).json({ error: 'Product not found' });
      }
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
      const deleted = await db('products')
          .where({ id })
          .del();

      if (deleted) {
          res.status(200).json({ message: 'Product deleted successfully' });
      } else {
          res.status(404).json({ error: 'Product not found' });
      }
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct };
