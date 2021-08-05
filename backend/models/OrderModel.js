'use strict';
import mongoose from 'mongoose';

// Schema
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        // FIXME: img: { type: string, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    paymentMethod: { type: String, required: true, trim: true },
    itemsPrice: { type: Number, required: true, trim: true },
    shippingPrice: { type: Number, required: true, trim: true },
    taxPrice: { type: Number, required: true, trim: true },
    totalPrice: { type: Number, required: true, trim: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
  {
    collection: 'orders',
  },
);

// Order Model
const Order = mongoose.model('Order', orderSchema);
export default Order;
