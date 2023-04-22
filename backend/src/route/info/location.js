import express from "express";
import locationController from "#root/controller/info/location.controller.js";
const router = express.Router();

router
  .route("/")
  .get(locationController.getAll)
  .post(locationController.addNew)
  .put(locationController.update)
  .delete(locationController.delete);

export default router;
