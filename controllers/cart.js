const Cart = require('../models/cart');
const { missingFields } = require('../middlewares/utils');

exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    return res.status(200).json({
      message: 'Carts fetched successfully',
      data: carts,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};


exports.getCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findById(id);
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
            });
        }
        return res.status(200).json({
            message: 'Cart found',
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

exports.addCart = async (req, res) => {
    try {
        const { products, user } = req.body;
        const missing = missingFields({ products, user });
        if (missing.length > 0) {
            return res.status(400).json({
                message: 'Missing fields',
                data: missing,
            });
        }

        const cart = await Cart.create({
            products,
            user,
        });
        return res.status(201).json({
            message: 'Cart created successfully',
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

exports.updateCart = async (req, res) => {
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

        const cart = await Cart.findByIdAndUpdate(id, {
            products,
            user,
        });
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
            });
        }
        return res.status(200).json({
            message: 'Cart updated successfully',
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

exports.deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found',
            });
        }
        return res.status(200).json({
            message: 'Cart deleted successfully',
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        });
    }
}

