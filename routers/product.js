const ProductController = require('../controllers/product');
const express = require('express');
const router = express.Router();

router.get('/product/', ProductController.getProducts);
router.get('/product/:id', ProductController.getProduct);
router.post('/product/', ProductController.addProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.delete('/product/:id/:imageId', ProductController.deleteProductImage);
router.put('/product/add-review/:id', ProductController.addProductReview);
router.get('/product/top-products', ProductController.getTopProducts);

module.exports = router;