import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { OrderServices } from "./order.services";

// Create order
const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

// Get all orders with optional search
const getAllOrders = catchAsync(async (req, res) => {
  const { keyword, shopId, status } = req.query;
  const result = await OrderServices.getAllOrders(
    keyword as string,
    shopId as string,
    status as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result,
  });
});

// Get single order by ID
const getSingleOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getSingleOrderById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

// Get orders by shopId
const getOrdersByShopId = catchAsync(async (req, res) => {
  const { shopId } = req.params;

  const result = await OrderServices.getOrdersByShopId(shopId as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully by shopId",
    data: result,
  });
});

// Update order
const updateOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.updateOrder(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  console.log(status);
  const result = await OrderServices.updateOrderStatus(req.params.id, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Order status updated to ${status} successfully`,
    data: result,
  });
});


// Delete order
const deleteOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.deleteOrder(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  updateOrder,
  deleteOrder,
  getOrdersByShopId,
};
