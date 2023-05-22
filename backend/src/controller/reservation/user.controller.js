import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Users from "#root/model/users.model.js";
import Orders from "#root/model/orders.model.js";
import mongoose from "mongoose";

const keyQuery = [
  "_id",
  "bookingName",
  "numberOfPeople",
  "date",
  "time",
  "location",
  "status",
  "user",
];

const lookupPipeline = (key) => {
  switch (key) {
    case "location":
      return [
        {
          $lookup: {
            from: "infos",
            let: { order_location: { $toObjectId: "$locationId" } },
            pipeline: [
              { $unwind: "$location" },
              { $project: { location: 1, _id: 0 } },
              {
                $addFields: {
                  _id: "$location._id",
                  location: {
                    $concat: ["detail", "district", "city"].reduce(
                      (resultArr, item, index, initArr) => [
                        ...resultArr,
                        `$location.${item}`,
                        index < initArr.length - 1 ? ", " : "",
                      ],
                      []
                    ),
                  },
                },
              },
              { $match: { $expr: { $eq: ["$_id", "$$order_location"] } } },
              { $unset: "_id" },
            ],
            as: "location",
          },
        },
        { $unwind: "$location" },
        { $unset: ["locationId", "__v"] },
        { $addFields: { location: "$location.location" } },
      ];

    case "user":
      return [
        {
          $lookup: {
            from: "users",
            pipeline: [{ $project: { __v: 0 } }],
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $unset: ["__v", "userId"] },
      ];

    default:
      break;
  }
};

const handleReservationByUser = {
  getAll: asyncWrapper(async (req, res) => {
    const field = req.query.field;
    const fieldSelect = field ? field.split(",") : keyQuery;

    // Find a user by phone number using findOne() method of Users model
    const foundUser = await Users.findOne({ phone: req.phone });
    if (!foundUser) return res.status(204).json("You are new here");

    // Find a reservation by user ID using find method of Orders model
    const foundOrder = await Orders.aggregate([
      { $match: { userId: foundUser._id } },
      ...lookupPipeline("location"),
      ...lookupPipeline("user"),
      {
        $facet: {
          total: [{ $count: "total" }],
          list: [{ $project: { __v: 0 } }],
        },
      },
      { $unwind: "$total" },
      { $unwind: "$list" },
      {
        $replaceRoot: {
          newRoot: {
            total: "$total.total",
            list: "$list",
          },
        },
      },
      {
        $group: {
          _id: "$total",
          total: { $first: "$total" },
          ...(fieldSelect.find((item) => item === "user") && {
            user: { $first: "$list.user" },
          }),
          list: {
            $push: fieldSelect
              .filter((item) => item !== "user")
              .reduce((obj, val) => {
                return { ...obj, [val]: `$list.${val}` };
              }, {}),
          },
        },
      },
      { $unset: "_id" },
    ]);

    return !foundOrder
      ? res.status(204).json("There is no order yet")
      : res.status(200).json(foundOrder[0]);
  }),

  getOne: asyncWrapper(async (req, res) => {
    const { _id, field } = req.query;
    const fieldSelect = field ? field.split(",") : keyQuery;

    // Check if id parameter exists in request object
    const keyConfig = ["_id", "phone"];
    keyConfig.forEach((key) => {
      return !req.query[key] && _throw(400, `${key} required`);
    });

    // Find a user by phone number using findOne() method of Users model
    const foundUser = await Users.findOne({ phone: req.phone });
    if (!foundUser) return res.status(204).json("You are new here");

    // Find a reservation by id using find method of Orders model
    const foundOrder = await Orders.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(_id), userId: foundUser._id } },
      ...lookupPipeline("location"),
      ...lookupPipeline("user"),
      {
        $project: fieldSelect.reduce((obj, item) => {
          return Object.assign(obj, { [item]: 1 });
        }, {}),
      },
    ]);

    return !foundOrder
      ? res.status(404).json(`There is no order match id ${_id}`)
      : res.status(200).json(foundOrder[0]);
  }),

  addNew: asyncWrapper(async (req, res) => {
    const { bookingName, locationId, numberOfPeople, date, time } = req.body;

    // Create a new order object with locationId and numberOfPeople properties
    let newOrder = new Orders({ bookingName, locationId, numberOfPeople, date, time });

    // Find or create a user in the database using Mongoose's findOneAndUpdate() method
    const user = await Users.findOneAndUpdate(
      { phone: req.phone },
      { name: bookingName },
      { upsert: true, runValidators: true }
    );

    // Assign the user ID to the new order object and save it to the database with a status of "success"
    Object.assign(newOrder, { userId: user._id, status: "success" });
    await newOrder.save();

    // Return a JSON response with a status code of 201 and the new order object as its body
    return res.status(201).json(newOrder);
  }),
};

export default handleReservationByUser;
