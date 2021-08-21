import express from 'express';
import asyncHandler from 'express-async-handler';
import data from './../data.js';
import User from './../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, hashPass } from '../utils.js';
import validator from 'express-validator';

const userRouter = express.Router();
const { check, checkSchema, validationResult } = validator;

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
  [
    check('email').isEmail().normalizeEmail().withMessage('Email no válido'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('La contraseña no puede estar vacía'),
  ],
  asyncHandler(async (req, res) => {
    validationResult(req).throw();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //TODO: [KPF-224] carry bcrypt functions to util.js
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

userRouter.post(
  '/register',
  // validations for user registration
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Nombre no válido',
      },
    },
    email: {
      isEmail: {
        errorMessage: 'Correo electrónico no válido',
      },
    },
    password: {
      isLength: {
        errorMessage: 'La contraseña debe tener al menos 4 caracteres',
        options: { min: 4 },
      },
    },
  }),
  asyncHandler(async (req, res) => {
    validationResult(req).throw();
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password: await hashPass(password),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  }),
);

export default userRouter;
