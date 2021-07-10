import express from 'express';
import asyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/ProductModel.js';

const productRouter = express.Router();

// GET /
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  }),
);

// TODO: Change /seed endpoint for a populate database script
// GET /seed
productRouter.get(
  '/seed',
  asyncHandler(async (req, res) => {
    //FIXME:  !!!! - Anyone could remove collection data by running this endpoint!
    await Product.deleteMany();
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  }),
);

// GET /:id
productRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    if (product) res.send(product);
    else res.status(404).send({ message: 'Producto no encontrado' });
  }),
);

export default productRouter;

// TODO: Esbuenaprácticameterenvariableslosparámetrosdelas peticiones.
/*
router.delete('/:id', asyncHandler(async(req, res, next) =>{
  const _id = req.params.id;
  ...
  }));

  Esbuenaprácticaquelosdocumentostenganuna propiedad de borrado lógico. Esto es marcar un documento como borrado pero mantenerlo. Funcionalmente está borrado pero mantenemos la info.
  HayquetratardeimplementarlalógicaenelModelo-> Recomendación de Javier, NO en los controladores. Los controladores sólo sirven al modelo los datos limpios, la lógica ha de estar en el modelo.

*/

/* TODO: 
  - Change /seed endpoint for a populate database script
  - Isolate database connection with a connectMongoose file
  - Error handler en server.js, está comentado
  - función isAPI
*/
