import express from 'express';
import asyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/ProductModel.js';
import mongoose from 'mongoose';
//See links https://www.kindacode.com/article/node-js-how-to-use-import-and-require-in-the-same-file/ (bad practise) fixed with https://stackoverflow.com/questions/46927589/express-validator-usage-with-esm-modules
import validator from 'express-validator';

const productRouter = express.Router();
const { check, validationResult } = validator;

// GET /api/products
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  }),
);

// TODO: Change /seed endpoint for a populate database script
// GET /api/products/seed
productRouter.get(
  '/seed',
  asyncHandler(async (req, res) => {
    //FIXME:  !!!! - Anyone could remove collection data by running this endpoint!
    await Product.deleteMany();
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  }),
);

// GET /api/products/:id
productRouter.get(
  '/:id',
  [
    check('id')
      .custom(id => mongoose.Types.ObjectId.isValid(id))
      .withMessage('ID de producto no válido'),
  ],
  asyncHandler(async (req, res) => {
    validationResult(req).throw();
    const _id = req.params.id;
    const product = await Product.findById(_id);
    product
      ? res.send(product)
      : res.status(404).send({ message: 'Producto no encontrado' });
  }),
);

export default productRouter;

/* TODO:
  DONE - Commit de shippingAddressScreen.js
  DONE - Corregir justo esto
  - Revisar las entradas de datos de los otros routers y de server.js
    - productRouter DONE
    - userRouter DONE
    - server DONE
    - orderRouter
  - withMessage()
  - Sanitizers. En el login, en /product:id, en post y put de /order
*/

/*
TODO: Es buena práctica meter en variables los parámetros de las peticiones.
La lógica ha de estar en el modelo.
Es buena práctica que los documentos tengan una propiedad de borrado lógico. Esto es marcar un documento como borrado pero mantenerlo. Funcionalmente está borrado pero mantenemos la info.
Hay que tratar de implementar la lógica en el Modelo -> Recomendación de Javier, NO en los controladores. Los controladores sólo sirven al modelo los datos limpios, la lógica ha de estar en el modelo.
/* 
  - Change /seed endpoint for a populate database script
  - Isolate database connection with a connectMongoose file
  - DONE - Error handler en server.js, está comentado
  - DONE - función isAPI
*/
