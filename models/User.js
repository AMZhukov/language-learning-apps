import { Schema } from "mongoose";

export const User = new Schema({
  _id: { type: String, required: true, unique: true },
  email: { type: String, require: true, unique: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  dateOfBirth: { type: date },
  registrationDate: { type: date, require: true },
  phoneNumber: { type: number },
});
