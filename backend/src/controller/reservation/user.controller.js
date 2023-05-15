import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Users from "#root/model/users.model.js";
import Orders from "#root/model/orders.model.js";
import convert from "#root/utils/convert.js";

const handleReservationByUser = {
  getAll: asyncWrapper(async (req, res) => {
    const phoneFormat = convert.phone(req.body.phone);

    // Find a user by phone number using findOne() method of Users model
    const foundUser = await Users.findOne({ phoneFormat });
    if (!foundUser) return res.status(204).json("You are new here");

    // Find a reservation by user ID using find method of Orders model
    const foundOrders = await Orders.find({ userId: foundUser._id }).populate("locationId");

    return !foundOrders
      ? // Send status code 204 and message "There is no order yet" if there is no order found
        res.status(204).json("There is no order yet")
      : // Send a JSON response with status code 200 containing two properties: total which is the length of foundOrders array and list which is the foundOrders array itself
        res.status(200).json({ total: foundOrders.length, list: foundOrders });
  }),

  getOne: asyncWrapper(async (req, res) => {
    const { _id, phone } = req.query;

    // Check if id parameter exists in request object
    const keyConfig = ["_id", "phone"];
    keyConfig.forEach((key) => {
      return !req.query[key] && _throw(400, `${key} required`);
    });

    const phoneFormat = convert.phone(phone);

    // Find a user by phone number using findOne() method of Users model
    const foundUser = await Users.findOne({ phoneFormat });
    if (!foundUser) return res.status(204).json("You are new here");

    // Find a reservation by id using find method of Orders model
    const foundOrder = await Orders.findOne({ _id, userId: foundUser._id })
      .populate({ path: "locationId", select: "-_id -__v" })
      .populate({ path: "userId", select: "-_id -__v" });

    return !foundOrder
      ? // Send status code 204 and message "There is no order yet" if there is no order found
        res.status(404).json(`There is no order match id ${id}`)
      : // Send a JSON response with status code 200 containing two properties: total which is the length of foundOrders array and list which is the foundOrders array itself
        res.status(200).json(foundOrder);
  }),

  addNew: asyncWrapper(async (req, res) => {
    const { name, phone, email, locationId, numberOfPeople, date, time } = req.body;

    // Create a new order object with locationId and numberOfPeople properties
    let newOrder = new Orders({ locationId, numberOfPeople, date, time });

    // Validate the new order object
    await newOrder.validate();

    // Format the phone number
    const phoneFormat = phone.startsWith(0) ? `+84${phone.slice(1)}` : phone;

    // Find or create a user in the database using Mongoose's findOneAndUpdate() method
    const user = await Users.findOneAndUpdate(
      { phone: phoneFormat },
      { name, phone: phoneFormat, email },
      { runValidators: true, upsert: true, new: true }
    );

    // Assign the user ID to the new order object and save it to the database with a status of "success"
    Object.assign(newOrder, { userId: user._id, status: "success" });
    await newOrder.save();

    // Return a JSON response with a status code of 201 and the new order object as its body
    return res.status(201).json(newOrder);
  }),
};

export default handleReservationByUser;
