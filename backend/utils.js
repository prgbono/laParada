import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../backend/models/UserModel.js';

export const generateToken = user => {
  const { _id, name, email, isAdmin } = user;

  return jwt.sign(
    {
      _id,
      name,
      email,
      isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: '14d' },
  );
};

export const isJWTAuth = (req, res, next) => {
  // Pick token up from headers, url or body
  const authorization =
    req.get('Authorization') || req.query.token || req.body.token;

  if (!authorization) {
    res.status(401).send({ message: 'Sin token de autorización' });
  } else {
    jwt.verify(authorization, process.env.JWT_SECRET, (err, payload) => {
      if (err) res.status(401).send({ message: 'Token no autorizado' });
      else {
        // send userId to the next middleware which probably will need it
        // FIXME: [KPF-230] Send userID as user makes confusion! Fix is only change next line by req.userId = payload._id;
        req.user = payload._id;
        next();
      }
    });
  }
};

// get SERVER_URL //FIXME: Not used yet
export const getServerUrl = () => {
  const port = process.env.SERVER_PORT || 5000;
  const dev = process.env.NODE_ENV !== 'production';
  const SERVER_URL = dev
    ? `http://localhost:${port}`
    : 'https://mariscoslaparada.es';
  return SERVER_URL;
};

export const hashPass = plainPass => {
  return bcrypt.hashSync(plainPass, 5);
};

export const sendOrderByEmail = async order => {
  const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    },
  });

  const user = await User.getUserDetails(order.user);

  return transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: user.email,
    subject: 'Company name - Hemos recibido correctamente tu pedido.',
    html: payOrderEmailTemplate(user, order),
  });
};

export const payOrderEmailTemplate = (user, order) => {
  return `<h1>Gracias ${
    user.name
  } por comprar en <strong>Company name</strong></h1>
  <h2>[Pedido ${order._id}] (${order.createdAt
    .toString()
    .substring(0, 10)})</h2>
    <p>Estamos preparando tu pedido. Estos son los detalles del mismo:</p>
    <table>
      <thead>
        <tr>
          <td><strong>Artículo</strong></td>
          <td><strong>Cantidad</strong></td>
          <td><strong align="right">Precio</strong>
        </td>
      </thead>
      <tbody>
        ${order.orderItems
          .map(
            item => `
        <tr>
          <td>${item.name}</td>
          <td align="center">${item.quantity}</td>
          <td align="right"> ${item.price.toFixed(2)}€</td>
        </tr>
      `,
          )
          .join('\n')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Subtotal:</td>
          <td align="right"> ${order.itemsPrice.toFixed(2)}€</td>
        </tr>
        <tr>
          <td colspan="2">IVA:</td>
          <td align="right"> ${order.taxPrice.toFixed(2)}€</td>
        </tr>
        <tr>
          <td colspan="2">Envío:</td>
          <td align="right"> ${order.shippingPrice.toFixed(2)}€</td>
        </tr>
        <tr>
          <td colspan="2"><strong>Total:</strong></td>
          <td align="right"><strong> ${order.totalPrice.toFixed(
            2,
          )}€</strong></td>
        </tr>
        <tr>
          <td colspan="2">Forma de pago:</td>
          <td align="right">${order.paymentMethod}</td>
        </tr>
      </tfoot>
    </table>
    <h2>Dirección de envío:</h2>
    <p>
      ${order.shippingAddress.fullName},<br/>
      ${order.shippingAddress.address},<br/>
      ${order.shippingAddress.city},<br/>
      ${order.shippingAddress.country},<br/>
      ${order.shippingAddress.postalCode}<br/>
    </p>
    <hr/>
    <p>Gracias por comprar en <strong>Company name</strong></p>
  `;
};
