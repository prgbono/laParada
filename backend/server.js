import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
// Next 2 instructions populate req.body in Node Apps.
// Allow JSON as body requests. Postman - body / raw / JSON
app.use(express.json());
// Allow x-www-form-uerlencoded body requests. Postman - body / x-www-form-uerlencoded
app.use(express.urlencoded({ extended: false }));
// app.use(logger('dev'));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const MONGODB_CONNECTION_STR =
  process.env.MONGODB_CONNECTION_STR || 'mongodb://localhost/laparada';
mongoose.connect(MONGODB_CONNECTION_STR, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Rutas del Api
// All from /api/users will be managed with userRouter.js
app.use('/api/users', userRouter);
// All from /api/products will be managed with productRouter.js
app.use('/api/products', productRouter);
// All from /api/orders will be managed with orderRouter.js
app.use('/api/orders', orderRouter);
// Paypal CLIENT_ID
// FIXME: Endpoint abierto que da el clientID, protegerlo!!!!
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sandbox');
});

// Rutas del Website
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// error handler
app.use(function (err, req, res, next) {
  if (err.array) {
    // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPIRequest(req)
      ? { message: `${errInfo.param} no válido`, errors: err.mapped() }
      : `No válido - ${errInfo.param} ${errInfo.msg}`;
  }

  // set status code
  err.status = err.status || 500;
  res.status(err.status);

  // JSON response for API requests
  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  res.send({ message: err.message });
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api') === 0;
}

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
