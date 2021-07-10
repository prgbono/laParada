import express from 'express';
import asyncHandler from 'express-async-handler';
import data from './../data.js';
import User from './../models/UserModel.js';

const userRouter = express.Router();

// TODO: Change /seed endpoint for a populate database script
userRouter.get(
  '/seed',
  asyncHandler(async (req, res) => {
    await User.deleteMany();
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  }),
);

export default userRouter;

/* TODO: 
  - Change /seed endpoint for a populate database script
  - Isolate database connection with a connectMongoose file
  - Error handler en server.js, está comentado
  - función isAPI
*/
