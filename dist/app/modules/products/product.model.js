"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    availableStock: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    taxValue: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available",
    },
    hsnCode: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});
ProductSchema.pre("save", function (next) {
    if (this.availableStock === 0) {
        this.status = "unavailable";
    }
    else {
        this.status = "available";
    }
    next();
});
ProductSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.availableStock !== undefined) {
        update.status = update.availableStock === 0 ? "unavailable" : "available";
        this.setUpdate(update);
    }
    next();
});
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
