import express from "express";
import { ClientControllers } from "./client.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

// Add a new client
router.post("/add", auth(UserRole.admin, UserRole.salesman, UserRole.supplier), ClientControllers.addClient);

// Get all clients with optional search & filters
router.get("/", ClientControllers.getAllClients);

// Get a single client by ID
router.get("/:id", ClientControllers.getSingleClient);

// Update client by ID
router.put("/:id", auth(UserRole.admin, UserRole.salesman, UserRole.supplier), ClientControllers.updateClient);

// Delete client by ID
router.delete("/:id", ClientControllers.deleteClient);

export const ClientRoutes = router;