const CartController = require('../controllers/cart');
const { verifyToken } = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.get('/', CartController.getCarts);
router.get('/:id', CartController.getCart);
router.post('/', verifyToken, CartController.addCart);
router.put('/:id', verifyToken, CartController.updateCart);
router.delete('/:id', verifyToken, CartController.deleteCart);

module.exports = router;