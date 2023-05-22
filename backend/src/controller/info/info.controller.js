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

    // const foundInfo = await Info.findOne();

    // for (const fieldUpdate of fieldUpdateArr) {
    //   const reqValue = req.body[fieldUpdate];
    //   switch (keyConfig[fieldUpdate]) {
    //     case "first":
    //       foundInfo[fieldUpdate] = reqValue;
    //       break;

    //     case "addToSet":
    //       const initValue = foundInfo[fieldUpdate];
    //       reqValue.forEach((item, index) => {
    //         const id = initValue[index]._id;
    //         initValue[index] = { ...item, _id: id };
    //       });
    //       break;

    //     default:
    //       break;
    //   }
    // }

    // await foundInfo.save();

    const updateInfo = await Info.findOneAndUpdate(
      {},
      fieldUpdateArr.reduce((obj, item) => {
        const reqValue = req.body[item];
        switch (keyConfig[item]) {
          case "first":
            obj[item] = reqValue;
            break;

          case "addToSet":
            reqValue.forEach((item, index) => {
              obj[index] = { ...item };
            });
            break;

          default:
            break;
        }
        return obj;
      }, {}),
      { runValidators: true, fields: { _id: 0, __v: 0 } }
    ).lean();

    // Return the updated location
    return res.status(200).json(updateInfo);
  }),
};

export default handleInfo;
