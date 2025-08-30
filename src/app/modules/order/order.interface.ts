import mongoose from "mongoose";

export type TOrderProduct = {
  productId: mongoose.Schema.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
  taxValue?: number;
};

export type TOrder = {
  shopId: mongoose.Schema.Types.ObjectId;
  shopName: string;
  area : string;
  totalAmount?: number;
  paidAmount?: number;
  pendingAmount?: number;
  previousDue?: number;
  totalPendingAmount?: number;
  products: TOrderProduct[];
  paymentMethod?: string;
  previousOrderId?: string;
  coveredDueAmount?: number;
  status ?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
