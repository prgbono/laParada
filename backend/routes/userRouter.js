import express from 'express';
import data from './../data.js';

const userRouter = express.Router();

// TODO: Change /seed endpoint for a populate database script
userRouter.get('/seed', async (req, res) => {
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});
