import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/products/product.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
