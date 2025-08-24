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
exports.ClientServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_model_1 = __importDefault(require("./client.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// Add client
const addClient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.default.create(payload);
    return result;
});
// Get all clients
const getAllClients = (keyword, status, area) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: "i" } },
            { shopName: { $regex: keyword, $options: "i" } },
        ];
    }
    if (status) {
        query.status = status;
    }
    if (area) {
        query.area = { $regex: area, $options: "i" };
    }
    const result = yield client_model_1.default.find(query);
    return result;
});
// Get single client by ID
const getSingleClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Client not found");
    }
    return result;
});
// Update client
const updateClient = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield client_model_1.default.findById(id);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Client not found");
    }
    const result = yield client_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete client
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Client not found");
    }
    return result;
});
exports.ClientServices = {
    addClient,
    getAllClients,
    getSingleClientById,
    updateClient,
    deleteClient,
};
