import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Orders from "#root/model/orders.model.js";
import Users from "#root/model/users.model.js";

const keyConfig = ["bookingName", "numberOfPeople", "date", "time", "locationId", "status", "user"];

const handleReservationByAdmin = {
  getAll: asyncWrapper(async (req, res) => {
    // Get all orders
    const foundOrders = await Orders.find();

    return !foundOrders
      ? // Send status code 204 and message "There is no order yet" if there is no order found
        res.status(204).json("There is no order yet")
      : // Send a JSON response with status code 200 containing two properties: total which is the length of foundOrders array and list which is the foundOrders array itself
        res.status(200).json({ total: foundOrders.length, list: foundOrders });
  }),
  updateOne: asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const foundUser = await Users.findOneAndUpdate(
      req.body.phone,
      { phone: req.body.phone },
      { runValidators: true, upsert: true }
    );

    const foundOrder = await Orders.findByIdAndUpdate(
      id,
      keyConfig.reduce(
        (obj, item) => {
          const value = req.body[item];
          return value ? Object.assign(obj, { [item]: item === "date" ? new Date(value) : value }) : obj;
        },
        req.body.phone ? { userId: foundUser._id } : {}
      ),
      { runValidators: true, new: true }
    );

    return res.status(200).json(Object.assign(foundOrder, { userId: foundUser._id }));
  }),
};

export default handleReservationByAdmin;
