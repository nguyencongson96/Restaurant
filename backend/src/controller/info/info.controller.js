import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Info from "#root/model/info.model.js";
import { ObjectId } from "bson";
import mongoose from "mongoose";

const keyConfig = {
  name: "first",
  phone: "first",
  email: "first",
  time: "addToSet",
  location: "addToSet",
};

const handleInfo = {
  get: asyncWrapper(async (req, res) => {
    const { field, detail } = req.query;
    const fieldArr = !field ? [] : req.query.field.split(",");

    let allInfo, fieldSelect;
    switch (Number(detail)) {
      case 0:
        fieldSelect = fieldArr.reduce(
          (result, key) => Object.assign(result, { [key]: { [`$${keyConfig[key]}`]: `$list.${key}` } }),
          {}
        );

        allInfo = (
          await Info.aggregate([
            { $unwind: "$location" },
            { $unwind: "$time" },
            {
              $addFields: {
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
                time: { $concat: ["$time.open", " - ", "$time.close"] },
              },
            },
            { $facet: { total: [{ $count: "total" }], list: [{ $unset: ["__v", "_id"] }] } },
            { $unwind: "$total" },
            { $unwind: "$list" },
            { $replaceRoot: { newRoot: { total: "$total.total", list: "$list" } } },
            { $group: Object.assign({ _id: "$total" }, fieldSelect) },
            { $unset: "_id" },
          ])
        )[0];
        break;

      case 1:
        fieldSelect = fieldArr.reduce((obj, item) => Object.assign(obj, { [item]: 1 }), { _id: 0 }, {});
        allInfo = await Info.findOne({}, fieldSelect);
        break;

      default:
        break;
    }

    // Return a JSON response with a status code of 200 and the array of location objects as its body
    return allInfo ? res.status(200).json(allInfo) : res.status(204).json("No Info");
  }),

  update: asyncWrapper(async (req, res) => {
    // If the info is not found, throw an error with a status code of 404 and a message indicating that it was not found

    const updateInfo = await Info.findOneAndUpdate(
      {},
      { name, phone, email, time, location },
      { runValidators: true, new: true, fields: { _id: 0, __v: 0 } }
    ).lean();

    // Return the updated location
    return res.status(200).json(updateInfo);
  }),
};

export default handleInfo;
