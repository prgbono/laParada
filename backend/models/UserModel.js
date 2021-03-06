'use strict';
import mongoose from 'mongoose';

//Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  },
  {
    collection: 'users',
  },
);

userSchema.statics.getUserDetails = function (userId) {
  return User.findById(userId);
};

// Model
const User = mongoose.model('User', userSchema);

// TODO: Don't use arrow functions on Mongoose methods
export default User;
