import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Orders from "#root/model/orders.model.js";

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
  update: asyncWrapper(async (req, res) => {
    const { id, locationId, numberOfPeople, status, date, time } = req.body;

    const foundOrder = Orders.findByIdAndUpdate(
      id,
      { locationId, numberOfPeople, status, date: new Date(date), time },
      { runValidators: true, new: true }
    );

    return res.status(201).json(foundOrder);
  }),
};

export default handleReservationByAdmin;
