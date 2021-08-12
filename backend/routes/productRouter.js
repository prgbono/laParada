import express from 'express';
import asyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/ProductModel.js';

const productRouter = express.Router();

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
  asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    product
      ? res.send(product)
      : res.status(404).send({ message: 'Producto no encontrado' });
  }),
);

export default productRouter;

// TODO: Es buena práctica meter en variables los parámetros de las peticiones.
/*
router.delete('/:id', asyncHandler(async(req, res, next) =>{
  const _id = req.params.id;
  ...
  }));

  Es buena práctica que los documentos tengan una propiedad de borrado lógico. Esto es marcar un documento como borrado pero mantenerlo. Funcionalmente está borrado pero mantenemos la info.
  Hay que tratar de implementar la lógica en el Modelo -> Recomendación de Javier, NO en los controladores. Los controladores sólo sirven al modelo los datos limpios, la lógica ha de estar en el modelo.
  TODO: la lógica ha de estar en el modelo.

*/

/* TODO: 
  - Change /seed endpoint for a populate database script
  - Isolate database connection with a connectMongoose file
  - Error handler en server.js, está comentado
  - función isAPI
*/
