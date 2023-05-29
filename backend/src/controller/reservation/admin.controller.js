import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Orders from "#root/model/orders.model.js";
import Users from "#root/model/users.model.js";
import generalConfig from "#root/config/general.config.js";
import pipeline from "#root/config/pipeline.config.js";

const keyQuery = generalConfig.order.key;

const handleReservationByAdmin = {
  getAll: asyncWrapper(async (req, res) => {
    const { page, random } = req.query;

    // Get all orders
    const foundOrders = await Orders.aggregate(
      pipeline({ lookup: ["location"], facet: { page, random } }, req.fieldSelect)
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

  updateMany: asyncWrapper(async (req, res) => {
    const { id, status } = req.body;
    const updateProduct = await Orders.updateMany({ _id: id }, { status: status });
    return res.status(200).json(updateProduct);
  }),
};

export default handleReservationByAdmin;
