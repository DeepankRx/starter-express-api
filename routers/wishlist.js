const WishlistController = require('../controllers/wishlist');
const { verifyToken } = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.get('/', WishlistController.getWishlists);
router.get('/:id', WishlistController.getWishlist);
router.post('/', verifyToken, WishlistController.addWishlist);
router.put('/:id', verifyToken, WishlistController.updateWishlist);

module.exports = router;
