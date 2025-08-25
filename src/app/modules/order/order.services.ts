/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Order from "./order.model";
import { TOrder } from "./order.interface";

// Create order
const createOrder = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};

// Get all orders with optional filters (keyword can search shopName)
const getAllOrders = async (
  keyword?: string,
  shopId?: string,
  status?: string
) => {
  const query: any = {};

  if (keyword) {
    query.shopName = { $regex: keyword, $options: "i" };
  }

  if (shopId) {
    query.shopId = shopId;
  }

  if (status) {
    query.status = status;
  }

  const result = await Order.find(query);
  return result;
};

// Get single order by ID
const getSingleOrderById = async (id: string) => {
  const result = await Order.findById(id)
    .populate("products.productId")
    .populate("shopId");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  return result;
};

const getOrdersByShopId = async (shopId: string) => {
  const orders = await Order.find({ shopId });
  return orders;
};

// Update order
const updateOrder = async (id: string, payload: Partial<TOrder>) => {
  const existing = await Order.findById(id);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  // Merge products if new products are provided
  let updatedProducts = existing.products;

  if (payload.products && payload.products.length > 0) {
    // Option 1: append new products
    updatedProducts = [...existing.products, ...payload.products];

    // Optional: merge by productId to avoid duplicates
    const map = new Map<string, (typeof updatedProducts)[0]>();
    updatedProducts.forEach((p) => map.set(p.productId.toString(), p));
    updatedProducts = Array.from(map.values());
  }

  // Merge payload without replacing products entirely
  const updatePayload: Partial<TOrder> = {
    ...payload,
    products: updatedProducts,
  };

  const result = await Order.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true,
  })
    .populate("products.productId")
    .populate("shopId");

  return result;
};

// Delete order
const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSingleOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByShopId,
};
