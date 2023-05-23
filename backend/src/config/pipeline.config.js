export default function pipeline(obj, fieldSelect) {
  const keyArr = Object.keys(obj);
  let result = [];

  keyArr.forEach((key) => {
    switch (key) {
      case "match":
        return result.push({ $match: obj.match });

      case "lookup":
        const valueArr = typeof obj.lookup === "string" ? JSON.parse("[" + string + "]") : obj.lookup;
        return valueArr.forEach((item) => {
          switch (item) {
            case "location":
              return result.push(
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
                            $concat: ["$location.detail", ", ", "$location.district", ", ", "$location.city"],
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
                { $addFields: { location: "$location.location" } }
              );

            case "user":
              return result.push(
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
                { $unset: ["__v", "userId"] }
              );

            default:
              break;
          }
        });

      case "facet":
        return (
          obj.facet &&
          result.push(
            { $facet: { total: [{ $count: "total" }], list: [{ $project: { __v: 0 } }] } },
            { $unwind: "$total" },
            { $unwind: "$list" },
            { $limit: Number(obj.limit) || 12 },
            { $replaceRoot: { newRoot: { total: "$total.total", list: "$list" } } },
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
            { $unset: "_id" }
          )
        );

      case "project":
        return (
          obj.project &&
          result.push({
            $project: fieldSelect.reduce((obj, item) => Object.assign(obj, { [item]: 1 }), {}),
          })
        );

      default:
        break;
    }
  });

  return result;
}
