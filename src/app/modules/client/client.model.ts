import { Schema, model } from "mongoose";
import { TClient } from "./client.interface";

const ClientSchema = new Schema<TClient>(
  {
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
  },
  {
    timestamps: true,
  }
);

const Client = model<TClient>("Client", ClientSchema);

export default Client;
