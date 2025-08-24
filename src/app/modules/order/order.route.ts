import express from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

// Create order
router.post("/create", auth(UserRole.admin, UserRole.salesman, UserRole.supplier), OrderControllers.createOrder);

// Get all orders (optional search: keyword, shopId)
router.get("/", OrderControllers.getAllOrders);

// Get single order
router.get("/:id", OrderControllers.getSingleOrder);

// Update order
router.put("/:id", auth(UserRole.admin, UserRole.salesman, UserRole.supplier), OrderControllers.updateOrder);

// Delete order
router.delete("/:id", auth(UserRole.admin, UserRole.salesman, UserRole.supplier), OrderControllers.deleteOrder);

export const OrderRoutes = router;
