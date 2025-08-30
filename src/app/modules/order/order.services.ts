/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Order from "./order.model";
import { TOrder } from "./order.interface";
import Product from "../products/product.model";

// Create order
const createOrder = async (payload: TOrder) => {
  // Find last order for this shop
  const lastOrder = await Order.findOne({ shopId: payload.shopId }).sort({
    createdAt: -1,
  });

  let previousDue = 0;
  let previousOrderId: string | null = null;

  if (lastOrder && lastOrder.totalPendingAmount! > 0) {
    previousDue = lastOrder.totalPendingAmount!;
    previousOrderId = lastOrder._id.toString();
  }

  const pendingAmount = payload.totalAmount! - payload.paidAmount!;
  const totalPendingAmount = previousDue + pendingAmount;

  // Create new order
  const newOrder = await Order.create({
    ...payload,
    previousDue,
    pendingAmount,
    totalPendingAmount,
    previousOrderId,
  });

  if (lastOrder) {
    lastOrder.totalPendingAmount = 0;
    await lastOrder.save();
  }

  // Decrease product quantities in DB
  if (payload.products && payload.products.length > 0) {
    for (const item of payload.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { availableStock: -item.quantity },
      });
    }
  }

  return newOrder;
};
// Update order
const updateOrder = async (id: string, payload: Partial<TOrder>) => {
  const existing = await Order.findById(id);
  if (!existing) throw new AppError(httpStatus.NOT_FOUND, "Order not found");

  const lastOrder = await Order.findOne({ shopId: existing.shopId }).sort({
    createdAt: -1,
  });
  if (!lastOrder || lastOrder._id.toString() !== existing._id.toString()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only latest order can be updated"
    );
  }

  // Calculate total payment so far including new payment
  const newPaidAmount = payload.paidAmount ?? 0;
  const alreadyPaid = existing.paidAmount ?? 0;
  const totalPaid = alreadyPaid + newPaidAmount;

  const totalPending = (existing.previousDue || 0) + existing.totalAmount!;
  const remaining = Math.max(0, totalPending - totalPaid);

  const pendingAmount = Math.min(existing.totalAmount!, remaining);
  const previousDue = Math.max(0, remaining - pendingAmount);

  // ✅ Always clear all older orders' pendingAmounts
  await Order.updateMany(
    { shopId: existing.shopId, createdAt: { $lt: existing.createdAt } },
    { $set: { pendingAmount: 0 } }
  );

  // ✅ Track only the last order id if dues are still carried
  let previousOrderId = existing.previousOrderId ?? null;
  if (previousDue > 0 && !previousOrderId) {
    const prevOrder = await Order.findOne({
      shopId: existing.shopId,
      createdAt: { $lt: existing.createdAt },
    }).sort({ createdAt: -1 });

    if (prevOrder) {
      previousOrderId = prevOrder._id.toString();
    }
  }

  // ✅ Update current order
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      ...payload,
      paidAmount: totalPaid, // accumulate payments
      pendingAmount,
      previousDue,
      totalPendingAmount: previousDue + pendingAmount,
      previousOrderId,
    },
    { new: true, runValidators: true }
  );

  return updatedOrder;
};

// Get all orders with optional filters (keyword can search shopName)
const getAllOrders = async (
  keyword?: string,
  shopId?: string,
  status?: string,
  area?: string
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

  if (area) {
    query.area = area;
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

const updateOrderStatus = async (id: string, status: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { status }, // assumes your Order model has a `status` field
    { new: true } // return the updated document
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

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
  updateOrderStatus,
  deleteOrder,
  getOrdersByShopId,
};
