const Product = require('../models/product');
const { missingFields } = require('../middlewares/utils');
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      message: 'Product found',
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, prices, categories, seller } = req.body;
    const missing = missingFields({ name, description, prices, categories });
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing fields',
        data: missing,
      });
    }

    // const { images } = req.files;
    // const imagesArray = [];
    // if(images){
    // images.map((image) => {
    //   imagesArray.push({ image: image.path });
    // });
    // }
    const product = await Product.create({
      name,
      description,
      prices,
      categories,
      seller,
      //   images: imagesArray,
    });

    return res.status(201).json({
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, prices, categories, countInStock } = req.body;
    // const { images } = req.files;
    // const imagesArray = [];
    // images.map((image) => {
    //   imagesArray.push({ image: image.path });
    // });

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
        prices: prices,
        categories: categories,
        countInStock: countInStock,
        //   images: imagesArray || product.images,
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    const image = product.images.id(imageId);
    if (!image) {
      return res.status(404).json({
        message: 'Image not found',
      });
    }
    image.remove();
    await product.save();
    return res.status(200).json({
      message: 'Image deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.addProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, user } = req.body;
    const missing = missingFields({ rating, comment, user });
    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Missing fields',
        data: missing,
      });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === user.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({
        message: 'Product already reviewed',
      });
    }
    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    return res.status(201).json({
      message: 'Review added',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    console.log("products");
    return res.status(200).json({
      message: 'Top products fetched successfully',
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
};