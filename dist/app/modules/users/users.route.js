"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// users.route.ts
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
// import { upload } from '../../utils/sendImageToCloudinary';
const router = express_1.default.Router();
router.get("/me", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier, auth_constannts_1.UserRole.client), users_controller_1.UserControllers.getMe);
router.get("/", (0, auth_1.default)(auth_constannts_1.UserRole.admin), users_controller_1.UserControllers.getAllUsers);
router.delete("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin), users_controller_1.UserControllers.deleteUser);
exports.userRoutes = router;
