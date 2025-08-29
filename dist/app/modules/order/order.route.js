"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const router = express_1.default.Router();
// Create order
router.post("/create", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), order_controller_1.OrderControllers.createOrder);
// Get all orders (optional search: keyword, shopId)
router.get("/", order_controller_1.OrderControllers.getAllOrders);
// Get single order
router.get("/:id", order_controller_1.OrderControllers.getSingleOrder);
// Get all orders for shop
router.get("/shop/:shopId", order_controller_1.OrderControllers.getOrdersByShopId);
// Update order
router.put("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), order_controller_1.OrderControllers.updateOrder);
// Delete order
router.delete("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), order_controller_1.OrderControllers.deleteOrder);
router.put("/update-status/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), order_controller_1.OrderControllers.updateOrderStatus);
exports.OrderRoutes = router;
