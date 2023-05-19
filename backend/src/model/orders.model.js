import mongoose from "mongoose";
import validator from "validator";
import _throw from "#root/utils/throw.js";
import orderConfig from "#root/config/order.config.js";
import Info from "#root/model/info.model.js";
import timeCheck from "#root/utils/timeCheck.js";
import Users from "#root/model/users.model.js";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    required: "User required",
    validate: async (id) => {
      !validator.isAlphanumeric(id.toString()) && _throw(400, "Invalid User");
      !(await Users.findById(id)) && _throw(400, "User cannot found");
    },
    ref: "Users",
  },
  bookingName: {
    type: String,
    trim: true,
    required: "name required",
    default: async () => (await Users.findById(this.userId)).name,
    validate: (value) => {
      !validator.isAlpha(value, "vi-VN", { ignore: " -" }) && _throw(400, "Invalid name");
    },
  },
  status: {
    type: String,
    lowercase: true,
    required: "Status required",
    validate: (value) => {
      (!validator.isAlpha(value) || !orderConfig.status.find((item) => item === value.toLowerCase())) &&
        _throw(400, "Invalid Status");
    },
  },
  locationId: {
    type: mongoose.ObjectId,
    required: "location required",
    validate: async (id) => {
      (await Info.findOne()).location.every((item) => !item._id.equals(id)) &&
        _throw(400, "Location cannot found");
    },
    ref: "Info",
  },
  numberOfPeople: {
    type: Number,
    required: "number required",
    min: 1,
    default: 1,
    validate: (value) => {
      !Number(value) && _throw(400, "Invalid number");
    },
  },
  date: {
    type: Date,
    required: "date required",
    validate: (value) => {
      timeCheck("date", value);
    },
  },
  time: {
    type: String,
    required: "time required",
    validate: (value) => {
      timeCheck("time", value);
    },
  },
});

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;
