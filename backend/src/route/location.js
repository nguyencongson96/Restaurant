import express from "express";
import locationController from "#root/controller/location/location.controller.js";
const router = express.Router();

router.route("/").get(locationController.getAll).post(locationController.addNew).put(locationController.update);

export default router;
