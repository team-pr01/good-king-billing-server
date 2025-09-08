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
    previousOrderId = lastOrder?.orderId!.toString();
  }

  const pendingAmount = payload.totalAmount! - payload.paidAmount!;
  const totalPendingAmount = previousDue + pendingAmount;

  // 👉 Generate custom orderId
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 01-12
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  const customOrderId = `MH20${year}${month}${randomDigits}`;

  // Create new order
  const newOrder = await Order.create({
    ...payload,
    previousDue,
    pendingAmount,
    totalPendingAmount,
    previousOrderId,
    orderId: customOrderId,
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

  const newPaidAmount = payload.paidAmount ?? 0;
  const alreadyPaid = existing.paidAmount ?? 0;

  // New installment amount (this transaction only)
  let installment = newPaidAmount;

  // Pending values from DB
  let previousDue = existing.previousDue ?? 0;
 let pendingAmount = payload.pendingAmount ?? existing.pendingAmount ?? existing.totalAmount!;

  

  // First apply to previous dues
  if (installment > 0 && previousDue > 0) {
    const appliedToPrev = Math.min(installment, previousDue);
    previousDue -= appliedToPrev;
    installment -= appliedToPrev;
  }

  // Then apply to this order’s pending
  if (installment > 0 && pendingAmount > 0) {
    const appliedToThis = Math.min(installment, pendingAmount);
    pendingAmount -= appliedToThis;
    installment -= appliedToThis;
  }

  // Total paid should be existing.paidAmount + newPaidAmount
  const totalPaid = alreadyPaid + newPaidAmount;

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
      previousOrderId = prevOrder?.orderId!.toString();
    }
  }

  // ✅ Update current order
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      ...payload,
       totalAmount: payload?.totalAmount,
      paidAmount: totalPaid,
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
