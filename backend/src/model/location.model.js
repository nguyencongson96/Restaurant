import mongoose from "mongoose";
import validator from "validator";
import _throw from "#root/utils/throw.js";
import configLocation from "#root/config/location.config.js";

const { city, district } = configLocation;

const locationSchema = new mongoose.Schema({
  cityId: {
    type: String,
    require: [true, "city required"],
    validate: (value) => {
      (!Object.keys(city).find((key) => key === value) || !validator.isNumeric(value)) && _throw(400, "Invalid city");
    },
  },
  districtId: {
    type: String,
    require: [true, "district required"],
    validate: (value) => {
      (!Object.keys(district).find((key) => key === value) || !validator.isNumeric(value.replace("-", ""))) &&
        _throw(400, "Invalid district");
    },
  },
  detail: {
    type: String,
    require: [true, "need detail location"],
    validate: (value) => {
      validator.isEmpty(value) && _throw(400, "Invalid detail location");
    },
  },
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
