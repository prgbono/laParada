import express from 'express';
import Order from './../models/OrderModel.js';
import asyncHandler from 'express-async-handler';
import { isJWTAuth, sendOrderByEmail } from './../utils.js';

const orderRouter = express.Router();

// GET /api/orders/mine
// Pay attention to the order of the endpoints. This one after /:id provokes errors
orderRouter.get(
  '/mine',
  isJWTAuth,
  asyncHandler(async (req, res) => {
    const userId = req.user;
    const orders = await Order.find({ user: userId });
    res.send(orders);
  }),
);

// POST /api/order
orderRouter.post(
  '/',
  // TODO: [KPF-220] validate POST order body
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

// GET /api/orders/:id
orderRouter.get(
  '/:id',
  // TODO: [KPF-227] Do we allow retrieving orders without being loged in? Sharing ID order would be possible
  // isJWTAuth
  // TODO: validate PUT order body
  asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Pedido no encontrado' });
    }
  }),
);

// PUT /api/orders/:id/pay
orderRouter.put(
  '/:id/pay',
  // isJWTAuth
  asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        //FIXME: email_address useless so far
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      if (order.user) 
        const orderEmail = await sendOrderByEmail(updateOrder);
      res.send({ message: 'Pedido pagado', order: updateOrder });
    } else {
      res.status(404).send({ message: 'Pedido no encontrado' });
    }
  }),
);

export default orderRouter;
