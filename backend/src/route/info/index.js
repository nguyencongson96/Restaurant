import express from "express";
import infoRoute from "#root/route/info/info.js";
import locationRoute from "#root/route/info/location.js";
const router = express.Router();

router.use("/location", locationRoute);
router.use("/", infoRoute);

export default router;
