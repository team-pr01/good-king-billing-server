/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Product from "./product.model";
import { TProduct } from "./product.interface";

// Add product (admin only)
const addProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (keyword?: string, hsnCode?: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { hsnCode: { $regex: keyword, $options: "i" } },
    ];
  }

  if (hsnCode && hsnCode !== "all") {
    query.hsnCode = { $regex: hsnCode, $options: "i" };
  }

  const result = await Product.find(query);
  return result;
};

// Get single product by ID
const getSingleProductById = async (id: string) => {
  const result = await Product.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

// Update product
const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  const existing = await Product.findById(id);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete product by ID
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  return result;
};

export const ProductServices = {
  addProduct,
  getAllProducts,
  getSingleProductById,
  updateProduct,
  deleteProduct,
};
