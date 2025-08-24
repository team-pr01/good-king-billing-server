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
  totalAmount?: number;
  paidAmount?: number;
  pendingAmount?: number;
  products: TOrderProduct[];
  paymentMethod?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
