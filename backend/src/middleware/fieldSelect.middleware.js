import orderConfig from "#root/config/order.config.js";
import infoConfig from "#root/config/info.config.js";
import productConfig from "#root/config/product.config.js";
import asyncWrapper from "#root/middleware/async.middleware.js";

const fieldSelect = asyncWrapper((req, res, next) => {
  const { field } = req.body;
  const urlPath = req.url;

  req.fieldSelect = urlPath.includes("reservation")
    ? field || orderConfig.key
    : urlPath.includes("info")
    ? field || Object.keys(infoConfig.key)
    : urlPath.includes("product")
    ? field || productConfig.key
    : [];

  next();
});

export default fieldSelect;
