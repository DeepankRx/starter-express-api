const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    trim: true,
                },
                color: {
                    type: String,
                    trim: true,
                },
                size: {
                    type: String,
                    trim: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
module.exports = Wishlist;
