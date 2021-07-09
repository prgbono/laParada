'use strict';
import mongoose from 'mongoose';

//Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
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

// BCRYPT
// userSchema.statics.hashPass = function (passNotEncrypted) {
//   return bcrypt.hash(passNotEncrypted, 5);
// };

// userSchema.methods.isCorrectPass = function (plainPass) {
//   return bcrypt.compare(plainPass, this.pass);
// };

// Model
const User = mongoose.model('User', userSchema);

// Don't use arrow functions on Mongoose methods
export default User;
