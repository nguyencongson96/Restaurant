import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Orders from "#root/model/orders.model.js";
import Users from "#root/model/users.model.js";
import orderConfig from "#root/config/order.config.js";
import pipeline from "#root/config/pipeline.config.js";

const keyQuery = orderConfig.key;

const handleReservationByAdmin = {
  getAll: asyncWrapper(async (req, res) => {
    const { limit } = req.query;

    // Get all orders
    const foundOrders = await Orders.aggregate(
      pipeline({ lookup: ["location", "user"], facet: true, limit: limit }, req.fieldSelect)
    );

    return foundOrders ? res.status(200).json(foundOrders[0]) : res.status(204).json("There is no order yet");
  }),

  updateOne: asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const foundUser = await Users.findOneAndUpdate(
      req.phone,
      { phone: req.phone },
      { runValidators: true, upsert: true, new: true }
    );

    const foundOrder = await Orders.findByIdAndUpdate(
      id,
      keyQuery.reduce(
        (obj, item) => {
          const value = req.body[item];
          return value ? Object.assign(obj, { [item]: item === "date" ? new Date(value) : value }) : obj;
        },
        req.phone ? { userId: foundUser._id } : {}
      ),
      { runValidators: true, new: true }
    );

    return res.status(200).json(foundOrder);
  }),
};

export default handleReservationByAdmin;
