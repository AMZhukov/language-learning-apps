// eslint-disable-line
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  dateOfBirth: { type: Date },
  registrationDate: { type: Date, default: new Date() },
  phoneNumber: { type: Number },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export const User = mongoose.model('User', schema);
