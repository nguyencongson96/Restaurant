import mongoose from "mongoose";
import validator from "validator";
import _throw from "#root/utils/throw.js";
import orderConfig from "#root/config/order.config.js";
import Location from "#root/model/location.model.js";
import timeCheck from "#root/utils/timeCheck.js";
import Users from "#root/model/users.model.js";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    require: [true, "User required"],
    validate: async (id) => {
      !validator.isAlphanumeric(id.toString()) && _throw(400, "Invalid User");
      !(await Users.findById(id)) && _throw(400, "User cannot found");
    },
  },
  status: {
    type: String,
    lowercase: true,
    require: [true, "Status required"],
    validate: (value) => {
      (!validator.isAlpha(value) ||
        !orderConfig.status.find((item) => item === value.toLowerCase())) &&
        _throw(400, "Invalid Status");
    },
  },
  locationId: {
    type: mongoose.ObjectId,
    require: [true, "location required"],
    validate: async (id) => {
      !mongoose.Types.ObjectId.isValid(id) && _throw(400, "Invalid location");
      !(await Location.findById(id)) && _throw(400, "Location cannot found");
    },
  },
  numberOfPeople: {
    type: Number,
    require: [true, "number required"],
    min: 1,
    validate: (value) => {
      !Number(value) && _throw(400, "Invalid number");
    },
  },
  date: {
    type: Date,
    require: [true, "date required"],
    validate: (value) => {
      !validator.isDate(value) && _throw(400, "Invalid Date");
      const maxTimeBook = parseInt(process.env.MAXDAYBOOK) * 24 * 60 * 60 * 1000;
      const now = new Date(),
        currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      value < currentDate && _throw(400, "Cannot book day in the past");
      value > currentDate + maxTimeBook && _throw(400, "Can only book in advance 3 days");
    },
  },
  time: {
    type: String,
    require: [true, "time required"],
    validate: (value) => {
      timeCheck(value);
    },
  },
});

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;
