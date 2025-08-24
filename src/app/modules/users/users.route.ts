// users.route.ts
import express from "express";
import { UserControllers } from "./users.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
// import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.get(
  "/me",
  auth(UserRole.admin, UserRole.salesman, UserRole.supplier, UserRole.client),
  UserControllers.getMe
);

export const userRoutes = router;
