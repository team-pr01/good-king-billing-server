import express from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

router.post("/add", auth(UserRole.admin), ProductControllers.addProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:id", ProductControllers.getSingleProduct);
router.put("/:id", auth(UserRole.admin), ProductControllers.updateProduct);
router.delete("/:id", auth(UserRole.admin), ProductControllers.deleteProduct);

export const ProductRoutes = router;