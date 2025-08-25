"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const product_route_1 = require("../modules/products/product.route");
const client_route_1 = require("../modules/client/client.route");
const order_route_1 = require("../modules/order/order.route");
const area_route_1 = require("../modules/area/area.route");
const users_route_1 = require("../modules/users/users.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: users_route_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/client",
        route: client_route_1.ClientRoutes,
    },
    {
        path: "/order",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/area",
        route: area_route_1.AreaRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
