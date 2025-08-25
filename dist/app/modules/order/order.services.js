"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_model_1 = __importDefault(require("./order.model"));
// Create order
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.create(payload);
    return result;
});
// Get all orders with optional filters (keyword can search shopName)
const getAllOrders = (keyword, shopId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.shopName = { $regex: keyword, $options: "i" };
    }
    if (shopId) {
        query.shopId = shopId;
    }
    if (status) {
        query.status = status;
    }
    const result = yield order_model_1.default.find(query);
    return result;
});
// Get single order by ID
const getSingleOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(id)
        .populate("products.productId")
        .populate("shopId");
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    return result;
});
const getOrdersByShopId = (shopId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find({ shopId });
    return orders;
});
// Update order
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield order_model_1.default.findById(id);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    // Merge products if new products are provided
    let updatedProducts = existing.products;
    if (payload.products && payload.products.length > 0) {
        // Option 1: append new products
        updatedProducts = [...existing.products, ...payload.products];
        // Optional: merge by productId to avoid duplicates
        const map = new Map();
        updatedProducts.forEach((p) => map.set(p.productId.toString(), p));
        updatedProducts = Array.from(map.values());
    }
    // Merge payload without replacing products entirely
    const updatePayload = Object.assign(Object.assign({}, payload), { products: updatedProducts });
    const result = yield order_model_1.default.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    })
        .populate("products.productId")
        .populate("shopId");
    return result;
});
// Delete order
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
    return result;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getSingleOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByShopId,
};
