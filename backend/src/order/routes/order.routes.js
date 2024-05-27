import express from "express";
import { createNewOrder,getSingleOrder,getUserOrder,allPlacedOrders,updateOrderStatus } from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/:orderId").get(auth, getSingleOrder);
router.route("/my/orders").get(auth, getUserOrder);
router.route("/orders/placed").get(auth, allPlacedOrders);
router.route("/update/:orderId").put(auth, updateOrderStatus);

export default router;
