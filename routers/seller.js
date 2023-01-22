const SellerController = require('../controllers/seller');
const { verifyToken } = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.get('/', SellerController.getSellers);
router.get('/:id', SellerController.getSeller);
router.post('/', verifyToken, SellerController.addSeller);
router.put('/:id', verifyToken, SellerController.updateSeller);
router.delete('/:id', verifyToken, SellerController.deleteSeller);

module.exports = router;