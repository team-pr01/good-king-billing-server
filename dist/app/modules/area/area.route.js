"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaRoutes = void 0;
const express_1 = __importDefault(require("express"));
const area_controller_1 = require("./area.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const router = express_1.default.Router();
// Add Area
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), area_controller_1.AreaControllers.addArea);
// Get all Areas
router.get("/", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), area_controller_1.AreaControllers.getAllAreas);
// Get single Area
router.get("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), area_controller_1.AreaControllers.getSingleArea);
// Update Area
router.put("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), area_controller_1.AreaControllers.updateArea);
// Delete Area
router.delete("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), area_controller_1.AreaControllers.deleteArea);
exports.AreaRoutes = router;
