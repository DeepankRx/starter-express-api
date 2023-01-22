const Seller = require('../models/seller');
const { missingFields } = require('../middlewares/utils');

exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({}).populate('products');
    return res.status(200).json({
      message: 'Sellers fetched successfully',
      data: sellers,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.getSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id).populate('products');
    if (!seller) {
      return res.status(404).json({
        message: 'Seller not found',
      });
    }
    return res.status(200).json({
      message: 'Seller found',
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.addSeller = async (req, res) => {
  try {
    const { name, description, products } = req.body;
    const missing = missingFields({ name, description, products });
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing fields',
        data: missing,
      });
    }

    const seller = await Seller.create({
      name,
      description,
      products,
    });
    return res.status(201).json({
      message: 'Seller created successfully',
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, products } = req.body;
    const missing = missingFields({ name, description, products });
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing fields',
        data: missing,
      });
    }

    const seller = await Seller.findByIdAndUpdate(id, {
      name,
      description,
      products,
    });
    if (!seller) {
      return res.status(404).json({
        message: 'Seller not found',
      });
    }
    return res.status(200).json({
      message: 'Seller updated successfully',
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByIdAndDelete(id);
    if (!seller) {
      return res.status(404).json({
        message: 'Seller not found',
      });
    }
    return res.status(200).json({
      message: 'Seller deleted successfully',
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

