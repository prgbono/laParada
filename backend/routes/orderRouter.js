import express from 'express';
import Order from './../models/OrderModel.js';
import asyncHandler from 'express-async-handler';
// import { isJWTAuth } from './../utils.js';

const orderRouter = express.Router();

// POST /api/order
orderRouter.post(
  '/',
  // isJWTAuth,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user,
    } = req.body;

    if (orderItems.length === 0) {
      res.status(400).send({ message: 'El carrito está vacío' });
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: user ? user._id : null,
      });
      const createdOrder = await order.save();
      res.status(201).send({ message: 'Pedido creado', order: createdOrder });
    }
  }),
);

export default orderRouter;
