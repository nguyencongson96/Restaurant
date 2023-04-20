import mongoose from "mongoose";
import validator from "validator";
import _throw from "#root/utils/throw.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    require: [true, "Name required"],
    validate: (value) => {
      !validator.isAlpha(value) && _throw(400, "Invalid name");
    },
  },
  phone: {
    type: String,
    trim: true,
    require: [true, "Phone required"],
    validate: (value) => {
      !validator.isMobilePhone(value, "vi-VN", { strictMode: true }) && _throw(400, "Invalid phone");
    },
  },
  email: {
    type: String,
    trim: true,
    require: [true, "Email required"],
    validate: (value) => {
      !validator.isEmail(value) && _throw(400, "Invalid email");
    },
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
