import express from "express";
import infoController from "#root/controller/info/info.controller.js";
const router = express.Router();

router.route("/").get(infoController.get).put(infoController.update);

export default router;
