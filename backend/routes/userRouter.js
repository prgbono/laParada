import express from 'express';
import asyncHandler from 'express-async-handler';
import data from './../data.js';
import User from './../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

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

userRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    } else
      res.status(401).send({ message: 'Email y/o contraseña incorrecto/s' });
  }),
);

export default userRouter;
