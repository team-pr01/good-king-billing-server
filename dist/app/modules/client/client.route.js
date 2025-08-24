"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("./client.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const router = express_1.default.Router();
// Add a new client
router.post("/add", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), client_controller_1.ClientControllers.addClient);
// Get all clients with optional search & filters
router.get("/", client_controller_1.ClientControllers.getAllClients);
// Get a single client by ID
router.get("/:id", client_controller_1.ClientControllers.getSingleClient);
// Update client by ID
router.put("/:id", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.salesman, auth_constannts_1.UserRole.supplier), client_controller_1.ClientControllers.updateClient);
// Delete client by ID
router.delete("/:id", client_controller_1.ClientControllers.deleteClient);
exports.ClientRoutes = router;
