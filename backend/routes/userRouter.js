import express from 'express';
import asyncHandler from 'express-async-handler';
import data from './../data.js';
import User from './../models/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, hashPass, isJWTAuth } from '../utils.js';
import validator from 'express-validator';

const userRouter = express.Router();
const { check, checkSchema, validationResult } = validator;

// GET /seed
userRouter.get(
  '/seed',
  asyncHandler(async (req, res) => {
    //FIXME:  !!!! - Anyone could remove User collection data by running this endpoint!
    await User.deleteMany();
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  }),
);

// POST /login
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

// POST /register
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
      password: hashPass(password),
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

// GET '/:id',
userRouter.get(
  '/:id',
  // TODO: validate userID
  isJWTAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    user
      ? res.send(user)
      : res.status(404).send({ message: 'Usuario no encontrado' });
  }),
);

// PUT /profile
// FIXME: Use partial updates with findOneAndUpdate
userRouter.put(
  '/profile',
  isJWTAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user); // req.user comes from utils.isJWTAuth
    if (user) {
      const {
        name: updatedName,
        email: updatedEmail,
        password: updatedPassword,
      } = req.body;
      const { name, email } = user;
      user.name = updatedName || name;
      user.email = updatedEmail || email;
      if (updatedPassword) user.password = hashPass(updatedPassword);
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else res.status(418).send({ message: 'I am never going to be here' });
  }),
);

// GET /
//TODO: Deshabilitar o securizar este endpoint!
userRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  }),
);

export default userRouter;
