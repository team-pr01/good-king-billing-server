import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ProductServices } from "./product.services";

// Add product
const addProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.addProduct(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

// Get all products
const getAllProducts = catchAsync(async (req, res) => {
  const { keyword, hsnCode, status } = req.query;
  const result = await ProductServices.getAllProducts(
    keyword as string,
    hsnCode as string,
    status as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

// Get single product
const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

// Update product
const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.updateProduct(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

// Delete product
const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deleteProduct(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductControllers = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
