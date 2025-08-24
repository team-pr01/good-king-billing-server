/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>(
  {
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
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre("save", function (next) {
  if (this.availableStock === 0) {
    this.status = "unavailable";
  } else {
    this.status = "available";
  }
  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate();
  if (update.availableStock !== undefined) {
    update.status = update.availableStock === 0 ? "unavailable" : "available";
    this.setUpdate(update);
  }
  next();
});

const Product = model<TProduct>("Product", ProductSchema);

export default Product;
