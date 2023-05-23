import orderConfig from "#root/config/order.config.js";
import infoConfig from "#root/config/info.config.js";
import asyncWrapper from "#root/middleware/async.middleware.js";

const fieldSelect = asyncWrapper((req, res, next) => {
  const { field } = req.query;
  const urlPath = req.url;

  req.fieldSelect = urlPath.includes("reservation")
    ? field
      ? field.split(",").map((item) => item.trim())
      : orderConfig.key
    : urlPath.includes("info")
    ? field
      ? field.split(",").map((item) => item.trim())
      : Object.keys(infoConfig.key)
    : [];

  next();
});

export default fieldSelect;
