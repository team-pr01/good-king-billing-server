"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AreaSchema = new mongoose_1.Schema({
    state: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
}, {
    timestamps: true,
});
const Area = (0, mongoose_1.model)("Area", AreaSchema);
exports.default = Area;
