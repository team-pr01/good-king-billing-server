"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        unique: true,
        default: null,
        sparse: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    gstNumber: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    area: {
        type: String,
        required: true,
        trim: true,
    },
    addressLine1: {
        type: String,
        required: true,
        trim: true,
    },
    addressLine2: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    addressLine3: {
        type: String,
        required: false,
        trim: true,
        default: null,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    district: {
        type: String,
        required: true,
        trim: true,
    },
    pinCode: {
        type: String,
        required: false,
        default: null,
        trim: true,
    },
}, {
    timestamps: true,
});
const Client = (0, mongoose_1.model)("Client", ClientSchema);
exports.default = Client;
