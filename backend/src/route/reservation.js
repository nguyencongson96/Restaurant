import express from "express";
import reservationUserController from "#root/controller/reservation/user.controller.js";
const router = express.Router();

router.route("/").get(reservationUserController.getAll).post(reservationUserController.addNew);

export default router;
