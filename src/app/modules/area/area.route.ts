import express from "express";
import { AreaControllers } from "./area.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

// Add Area
router.post(
  "/add",
  auth(UserRole.admin, UserRole.salesman, UserRole.supplier),
  AreaControllers.addArea
);

// Get all Areas
router.get(
  "/",
  auth(UserRole.admin, UserRole.salesman, UserRole.supplier),
  AreaControllers.getAllAreas
);

// Get single Area
router.get(
  "/:id",
  auth(UserRole.admin, UserRole.salesman, UserRole.supplier),
  AreaControllers.getSingleArea
);

// Update Area
router.put(
  "/:id",
  auth(UserRole.admin, UserRole.salesman, UserRole.supplier),
  AreaControllers.updateArea
);

// Delete Area
router.delete(
  "/:id",
  auth(UserRole.admin, UserRole.salesman, UserRole.supplier),
  AreaControllers.deleteArea
);

export const AreaRoutes = router;
