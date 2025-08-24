"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const router = express_1.default.Router();
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin), product_controller_1.ProductControllers.addProduct);
router.get("/", product_controller_1.ProductControllers.getAllProducts);
router.get("/:id", product_controller_1.ProductControllers.getSingleProduct);
router.put("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin), product_controller_1.ProductControllers.updateProduct);
router.delete("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin), product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
