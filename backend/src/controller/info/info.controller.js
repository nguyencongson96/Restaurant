import asyncWrapper from "#root/middleware/async.middleware.js";
import _throw from "#root/utils/throw.js";
import Info from "#root/model/info.model.js";

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
    const fieldArr = !field ? Object.keys(keyConfig) : field.split(",");

    let allInfo, fieldSelect;
    switch (Number(detail)) {
      case 0:
        fieldSelect = fieldArr.reduce(
          (result, key) => Object.assign(result, { [key]: { [`$${keyConfig[key]}`]: `$${key}` } }),
          {}
        );

        allInfo = await Info.aggregate([
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
          { $group: Object.assign({ _id: "$name" }, fieldSelect) },
          { $unset: "_id" },
        ]);
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
    const fieldSelect = !req.query.field ? Object.keys(keyConfig) : req.query.field.split(",");
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
        fields: fieldSelect.reduce((obj, item) => Object.assign({ [item]: 1 }, obj), {}),
        new: true,
      }
    ).lean();

    // Return the updated location
    return res.status(200).json(updateInfo);
  }),
};

export default handleInfo;
