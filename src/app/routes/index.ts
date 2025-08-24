import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/products/product.route";
import { ClientRoutes } from "../modules/client/client.route";
import { OrderRoutes } from "../modules/order/order.route";
import { AreaRoutes } from "../modules/area/area.route";

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
  {
    path: "/client",
    route: ClientRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/area",
    route: AreaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
