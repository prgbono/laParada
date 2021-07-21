import express from 'express';
import asyncHandler from 'express-async-handler';
import data from './../data.js';
import User from './../models/UserModel.js';

const userRouter = express.Router();

// GET /
//TODO: Deshabilitar o securizar este endpoint!
userRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  }),
);

// TODO: Change /seed endpoint for a populate database script
userRouter.get(
  '/seed',
  asyncHandler(async (req, res) => {
    //FIXME:  !!!! - Anyone could remove User collection data by running this endpoint!
    await User.deleteMany();
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  }),
);

export default userRouter;

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
