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
exports.ProductServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("./product.model"));
// Add product (admin only)
const addProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payload);
    return result;
});
const getAllProducts = (keyword, hsnCode, status) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: "i" } },
            { hsnCode: { $regex: keyword, $options: "i" } },
        ];
    }
    if (hsnCode) {
        query.hsnCode = { $regex: hsnCode, $options: "i" };
    }
    if (status) {
        query.status = status;
    }
    const result = yield product_model_1.default.find(query);
    return result;
});
// Get single product by ID
const getSingleProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    return result;
});
// Update product
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield product_model_1.default.findById(id);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    const result = yield product_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete product by ID
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    return result;
});
exports.ProductServices = {
    addProduct,
    getAllProducts,
    getSingleProductById,
    updateProduct,
    deleteProduct,
};
