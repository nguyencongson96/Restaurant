import asyncWrapper from "#root/middleware/async.middleware.js";
import Time from "#root/model/time.model.js";
import _throw from "#root/utils/throw.js";
import mongoose from "mongoose";

const handleTime = {
  getAll: asyncWrapper(async (req, res) => {
    // Get all times in database
    const list = await Time.find();

    list.length === 0
      ? // If there are no times in the database, return a 204 status code
        res.status(204).json("There is no time yet")
      : // Otherwise, return the list of times with a 200 status code
        res.status(200).json(list);
  }),
  addNew: asyncWrapper(async (req, res) => {
    const { hour, minute } = req.body;

    // Check if the time already exists in the database
    const foundTime = await Time.findOne({ hour, minute });
    foundTime && _throw(400, "Time existed");

    // Create a new time and add it to the database
    const newTime = await Time.create({ hour, minute });

    // Return the new time with a 200 status code
    res.status(200).json(newTime);
  }),
  update: asyncWrapper(async (req, res) => {
    const { hour, minute } = req.body,
      { id } = req.params;

    //Check validtion of id
    !mongoose.Types.ObjectId.isValid(id) && _throw(400, "Invalid Id");

    //Update time
    const updateTime = await Time.findByIdAndUpdate(id, { hour, minute }, { runValidators: true, new: true });

    //Send status 200 with updated time
    res.status(200).json(updateTime);
  }),
  delete: asyncWrapper(async (req, res) => {
    const { id } = req.params;

    //Check validtion of id
    !mongoose.Types.ObjectId.isValid(id) && _throw(400, "Invalid Id");

    //Find time base on id and delete
    const deleteTime = await Time.findByIdAndDelete(id);

    !deleteTime
      ? //If cannot find time, send back status 404 with msg Cannot find Time
        _throw(404, "Cannot find Time")
      : //Otherwise, send back status 200 with deleteTime info
        res.status(200).json(deleteTime);
  }),
};

export default handleTime;
