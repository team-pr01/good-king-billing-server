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
const product_model_1 = __importDefault(require("../products/product.model"));
// Create order
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find last order for this shop
    const lastOrder = yield order_model_1.default.findOne({ shopId: payload.shopId }).sort({
        createdAt: -1,
    });
    let previousDue = 0;
    let previousOrderId = null;
    if (lastOrder && lastOrder.totalPendingAmount > 0) {
        previousDue = lastOrder.totalPendingAmount;
        previousOrderId = lastOrder === null || lastOrder === void 0 ? void 0 : lastOrder.orderId.toString();
    }
    const pendingAmount = payload.totalAmount - payload.paidAmount;
    const totalPendingAmount = previousDue + pendingAmount;
    // 👉 Generate custom orderId
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 01-12
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 random digits
    const customOrderId = `MH20${year}${month}${randomDigits}`;
    // Create new order
    const newOrder = yield order_model_1.default.create(Object.assign(Object.assign({}, payload), { previousDue,
        pendingAmount,
        totalPendingAmount,
        previousOrderId, orderId: customOrderId }));
    if (lastOrder) {
        lastOrder.totalPendingAmount = 0;
        yield lastOrder.save();
    }
    // Decrease product quantities in DB
    if (payload.products && payload.products.length > 0) {
        for (const item of payload.products) {
            yield product_model_1.default.findByIdAndUpdate(item.productId, {
                $inc: { availableStock: -item.quantity },
            });
        }
    }
    return newOrder;
});
// Update order
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const existing = yield order_model_1.default.findById(id);
    console.log(existing);
    if (!existing)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    const lastOrder = yield order_model_1.default.findOne({ shopId: existing.shopId }).sort({
        createdAt: -1,
    });
    if (!lastOrder || lastOrder._id.toString() !== existing._id.toString()) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Only latest order can be updated");
    }
    // Calculate total payment so far including new payment
    const newPaidAmount = (_a = payload.paidAmount) !== null && _a !== void 0 ? _a : 0;
    const alreadyPaid = (_b = existing.paidAmount) !== null && _b !== void 0 ? _b : 0;
    const totalPaid = alreadyPaid + newPaidAmount;
    const totalPending = (existing.previousDue || 0) + existing.totalAmount;
    const remaining = Math.max(0, totalPending - totalPaid);
    const pendingAmount = Math.min(existing.totalAmount, remaining);
    const previousDue = Math.max(0, remaining - pendingAmount);
    // ✅ Always clear all older orders' pendingAmounts
    yield order_model_1.default.updateMany({ shopId: existing.shopId, createdAt: { $lt: existing.createdAt } }, { $set: { pendingAmount: 0 } });
    // ✅ Track only the last order id if dues are still carried
    let previousOrderId = (_c = existing.previousOrderId) !== null && _c !== void 0 ? _c : null;
    if (previousDue > 0 && !previousOrderId) {
        const prevOrder = yield order_model_1.default.findOne({
            shopId: existing.shopId,
            createdAt: { $lt: existing.createdAt },
        }).sort({ createdAt: -1 });
        if (prevOrder) {
            previousOrderId = prevOrder === null || prevOrder === void 0 ? void 0 : prevOrder.orderId.toString();
        }
    }
    console.log(previousOrderId, "hi");
    // ✅ Update current order
    const updatedOrder = yield order_model_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, payload), { paidAmount: totalPaid, // accumulate payments
        pendingAmount,
        previousDue, totalPendingAmount: previousDue + pendingAmount, previousOrderId }), { new: true, runValidators: true });
    return updatedOrder;
});
// Get all orders with optional filters (keyword can search shopName)
const getAllOrders = (keyword, shopId, status, area) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (area) {
        query.area = area;
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
const updateOrderStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndUpdate(id, { status }, // assumes your Order model has a `status` field
    { new: true } // return the updated document
    );
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Order not found");
    }
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
    updateOrderStatus,
    deleteOrder,
    getOrdersByShopId,
};
