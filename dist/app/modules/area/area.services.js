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
exports.AreaServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const area_model_1 = __importDefault(require("./area.model"));
// Add Area
const addArea = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield area_model_1.default.create(payload);
    return result;
});
// Get all Areas
const getAllAreas = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield area_model_1.default.find();
    return result;
});
// Get single Area by ID
const getSingleAreaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield area_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Area not found");
    }
    return result;
});
// Update Area
const updateArea = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield area_model_1.default.findById(id);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Area not found");
    }
    const result = yield area_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete Area
const deleteArea = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield area_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Area not found");
    }
    return result;
});
exports.AreaServices = {
    addArea,
    getAllAreas,
    getSingleAreaById,
    updateArea,
    deleteArea,
};
