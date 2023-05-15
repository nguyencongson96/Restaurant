import mongoose from "mongoose";
import validator from "validator";
import _throw from "#root/utils/throw.js";

const infoSchema = new mongoose.Schema({
  name: { type: String, require: [true, "required name"] },
  phone: {
    type: String,
    require: [true, "required phone"],
    validate: (value) => {
      !validator.isMobilePhone(value, "vi-VN") && _throw(400, "Invalid phone");
    },
  },
  email: {
    type: String,
    require: [true, "required email"],
    validate: (value) => {
      !validator.isEmail(value) && _throw(400, "Invalid email");
    },
  },
  time: [
    {
      open: {
        type: String,
        require: [true, "open time required"],
        validate: (value) => {
          !validator.isTime(value, { hourFormat: "hour24", mode: "default" }) && _throw(400, "Invalid Time");
        },
      },
      close: {
        type: String,
        require: [true, "close time required"],
        validate: (value) => {
          !validator.isTime(value, { hourFormat: "hour24", mode: "default" }) && _throw(400, "Invalid Time");
        },
      },
    },
  ],
});

const Info = mongoose.model("Info", infoSchema);

export default Info;
