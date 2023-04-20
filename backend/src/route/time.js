import express from "express";
import timeController from "#root/controller/time/time.controller.js";
const route = express.Router();

route.route("/").get(timeController.getAll).post(timeController.addNew);
route.route("/:id").put(timeController.update).delete(timeController.delete);

export default route;
