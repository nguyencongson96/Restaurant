import mongoose from "mongoose";
import _throw from "#root/utils/throw.js";

const timeSchema = new mongoose.Schema({
  hour: {
    type: Number,
    min: [0, "Hour is a positive number"],
    max: [23, "Hour cannot exceed number 23"],
    require: [true, "Hour required"],
    validate: (value) => {
      !Number(value) && _throw(400, "Hour contains only number");
    },
  },
  minute: {
    type: Number,
    min: [0, "Minute is a positive number"],
    max: [59, "Minute cannot exceed number 59"],
    require: [true, "Minute required"],
    validate: (value) => {
      !Number(value) && _throw(400, "Minute contains only number");
    },
  },
});

const Time = mongoose.model("Time", timeSchema);

export default Time;
