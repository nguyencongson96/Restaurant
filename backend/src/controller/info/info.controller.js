import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Info from "#root/model/info.model.js";
import infoConfig from "#root/config/info.config.js";
import jwt from "jsonwebtoken";

const keyConfig = infoConfig.key;

const handleInfo = {
  get: asyncWrapper(async (req, res) => {
    const { detail } = req.query;

    let allInfo, fieldSelect;
    switch (Number(detail)) {
      case 0:
        fieldSelect = req.fieldSelect.reduce(
          (result, key) => Object.assign(result, { [key]: { [`$${keyConfig[key]}`]: `$${key}` } }),
          {}
        );

        allInfo = await Info.aggregate([
          { $unwind: "$location" },
          { $unwind: "$time" },
          {
            $addFields: {
              location: { $concat: ["$location.detail", ", ", "$location.district", ", ", "$location.city"] },
              time: { $concat: ["$time.open", " - ", "$time.close"] },
            },
          },
          { $group: Object.assign({ _id: "$name" }, fieldSelect) },
          { $unset: "_id" },
        ]);
        break;

      case 1:
        fieldSelect = req.fieldSelect.reduce(
          (obj, item) => Object.assign(obj, { [item]: 1 }),
          { _id: 0 },
          {}
        );
        allInfo = await Info.findOne({}, fieldSelect);
        break;

      default:
        break;
    }

    // Return a JSON response with a status code of 200 and the array of location objects as its body
    return allInfo ? res.status(200).json(allInfo) : res.status(204).json("No Info");
  }),

  logIn: asyncWrapper(async (req, res) => {
    const { password } = req.body;
    const foundInfo = await Info.findOne({ password });
    !foundInfo && _throw(400, "wrong password");

    const accessToken = jwt.sign(
      {
        info: {
          user: foundInfo.name,
          password: password,
          roles: "admin",
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" }
    );

    foundInfo.accessToken = accessToken;
    await foundInfo.save();

    return res.status(200).json({ accessToken });
  }),

  update: asyncWrapper(async (req, res) => {
    const fieldUpdateArr = Object.keys(req.body);

    const updateInfo = await Info.findOneAndUpdate(
      {},
      fieldUpdateArr.reduce((result, item) => {
        const reqValue = req.body[item];

        let formatVal;
        switch (keyConfig[item]) {
          case "first":
            formatVal = { [item]: reqValue };
            break;

          case "addToSet":
            formatVal = reqValue.reduce((obj, subItem, index) => {
              const convertObj = Object.keys(subItem).reduce(
                (obj, key) => Object.assign(obj, { [`${item}.${index}.${key}`]: subItem[key] }),
                {}
              );
              return Object.assign(obj, convertObj);
            }, {});
            break;

          default:
            break;
        }
        return Object.assign(result, formatVal);
      }, {}),
      {
        runValidators: true,
        fields: req.fieldSelect.reduce((obj, item) => Object.assign({ [item]: 1 }, obj), {}),
        new: true,
      }
    ).lean();

    // Return the updated location
    return res.status(200).json(updateInfo);
  }),

  logOut: asyncWrapper(async (req, res) => {
    const foundInfo = await Info.findOneAndUpdate(
      {},
      { accessToken: "" },
      { runValidators: true, new: true, fields: { _id: 0, __v: 0 } }
    );
    return res.status(200).json(foundInfo);
  }),
};

export default handleInfo;
