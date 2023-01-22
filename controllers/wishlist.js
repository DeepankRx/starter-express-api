const Wishlist = require('../models/wishlist');
const { missingFields } = require('../middlewares/utils');

exports.getWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({});
    return res.status(200).json({
      message: 'Wishlists fetched successfully',
      data: wishlists,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findById(id);
    if (!wishlist) {
      return res.status(404).json({
        message: 'Wishlist not found',
      });
    }
    return res.status(200).json({
      message: 'Wishlist found',
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.addWishlist = async (req, res) => {
  try {
    const { products, user } = req.body;
    const missing = missingFields({ products, user });
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing fields',
        data: missing,
      });
    }

    const wishlist = await Wishlist.create({
      products,
      user,
    });
    return res.status(201).json({
      message: 'Wishlist created successfully',
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, user } = req.body;
    const missing = missingFields({ products, user });
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing fields',
        data: missing,
      });
    }

    const wishlist = await Wishlist.findByIdAndUpdate(id, {
      products,
      user,
    });
    if (!wishlist) {
      return res.status(404).json({
        message: 'Wishlist not found',
      });
    }
    return res.status(200).json({
      message: 'Wishlist updated successfully',
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const wishlist = await Wishlist.findByIdAndDelete(id);
    if (!wishlist) {
      return res.status(404).json({
        message: 'Wishlist not found',
      });
    }
    return res.status(200).json({
      message: 'Wishlist deleted successfully',
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

