'use strict';
import mongoose from 'mongoose';

// Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number },
    stock: { type: Number, required: true },
    description: { type: String, trim: true },
    image: { type: String },
    category: { type: String },
    //TODO: category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  },
  {
    timestamps: true,
  },
  {
    collection: 'products',
  },
);

// Product Model
const Product = mongoose.model('Product', productSchema);

// Don't use arrow functions on Mongoose methods
export default Product;
