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
mongoose.connect(
  //TODO: process.env.MISMO_NOMBRE_QUE_ARCHIVO_SUPERVISOR!!! Cambiarlo en ambos sitios, aquí y en /etc/supervisor/conf.d/laparadaBE.conf
  MONGODB_CONNECTION_STR,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
);

// Rutas del Api
// All from /api/users will be managed with userRouter.js
app.use('/api/users', userRouter);
// All from /api/products will be managed with productRouter.js
app.use('/api/products', productRouter);
// All from /api/orders will be managed with orderRouter.js
app.use('/api/orders', orderRouter);

// Rutas del Website
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// TODO: DotEnv SERVER_PORT instead of 5000
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// ----------------------------------------------------------------
// TODO: THIS WHAT I USED IN THE PRACTICE!!! THIS WOULD BE IN Error handler
// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
//   if (err.array) { // validation error
//     err.status = 422;
//     const errInfo = err.array({ onlyFirstError: true })[0];
//     err.message = isAPI(req) ?
//       { message: 'not valid', errors: err.mapped()}
//       : `not valid - ${errInfo.param} ${errInfo.msg}`;
//   }

//   // establezco el status a la respuesta
//   err.status = err.status || 500;
//   res.status(err.status);

//   // si es un 500 lo pinto en el log
//   if (err.status && err.status >= 500) console.error(err);

//   // si es una petición al API respondo JSON...
//   if (isAPI(req)) {
//     res.json({ error: err.message });
//     return;
//   }
// ----------------------------------------------------------------
