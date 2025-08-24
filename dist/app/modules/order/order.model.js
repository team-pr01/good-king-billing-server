"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importStar(require("mongoose"));
const OrderProductSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    taxValue: {
        type: Number,
        required: false,
        min: 0,
    },
}, { _id: false });
const OrderSchema = new mongoose_1.Schema({
    shopId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    totalAmount: {
        type: Number,
        required: false,
        min: 0,
    },
    paidAmount: {
        type: Number,
        required: false,
        min: 0,
    },
    pendingAmount: {
        type: Number,
        required: false,
        min: 0,
    },
    paymentMethod: {
        type: String,
        required: false,
        trim: true,
    },
    products: {
        type: [OrderProductSchema],
        required: true,
        validate: [(val) => val.length > 0, "Products cannot be empty"],
    },
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
