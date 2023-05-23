import mongoose from "mongoose";
import validator from "validator";
import _throw from "#root/utils/throw.js";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "name required",
    validate: (value) => {
      !validator.isAlphanumeric(value, "vi-VN", { ignore: " -" }) && _throw(400, "Invalid name");
    },
  },
  class: {
    type: String,
    default: "event",
    validate: (value) => {
      (!validator.isAlphanumeric(value, "vi-VN", { ignore: " -" }) ||
        !["event", "promotion", "highlight"].includes(value)) &&
        _throw(400, "Invalid class");
    },
  },
  description: {
    type: String,
    required: "description required",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  endAt: {
    type: Date,
    default: new Date(),
  },
});

const Events = mongoose.model("Events", eventSchema);

export default Events;
