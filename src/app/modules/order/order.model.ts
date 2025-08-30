/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, model } from "mongoose";
import { TOrder, TOrderProduct } from "./order.interface";

const OrderProductSchema = new Schema<TOrderProduct>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { _id: false }
);

const OrderSchema = new Schema<TOrder>(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
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
    previousDue: {
      type: Number,
      required: false,
      min: 0,
    },
    totalPendingAmount: {
      type: Number,
      required: false,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: false,
      trim: true,
    },
    previousOrderId: {
      type: String,
      required: false,
      trim: true,
    },
    coveredDueAmount: {
      type: Number,
      required: false,
      min: 0,
    },
    status: {
      type: String,
      required: false,
      default: "pending",
      trim: true,
    },
    products: {
      type: [OrderProductSchema],
      required: true,
      validate: [(val: any[]) => val.length > 0, "Products cannot be empty"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<TOrder>("Order", OrderSchema);

export default Order;
