const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    //price based on color, size, and quantity
    prices: [
      {
        color: {
          type: String,
          trim: true,
        },
        size: {
          type: String,
          trim: true,
        },
        quantity: {
          type: Number,
          trim: true,
        },
        price: {
          type: Number,
          trim: true,
        },
      },
    ],
    //images based on color
    images: [
      {
        color: {
          type: String,
          trim: true,
        },
        image: {
          type: String,
          trim: true,
        },
      },
    ],
    //categories
    categories: [
      {
        type: String,
        trim: true,
      },
    ],
    //reviews
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          trim: true,
        },
        comment: {
          type: String,
          trim: true,
        },
      },
    ],
    //average rating
    rating: {
      type: Number,
      trim: true,
    },
    //number of reviews
    numReviews: {
      type: Number,
      trim: true,
    },
    //number of items in stock
    countInStock: {
      type: Number,
      trim: true,
      default: 0,
    },
    //seller id
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;