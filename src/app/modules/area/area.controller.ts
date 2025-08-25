import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AreaServices } from "./area.services";

// Add Area
const addArea = catchAsync(async (req, res) => {
  const result = await AreaServices.addArea(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Area created successfully",
    data: result,
  });
});

// Get all Areas
const getAllAreas = catchAsync(async (req, res) => {
  const { keyword } = req.query;
  const result = await AreaServices.getAllAreas(keyword as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Areas retrieved successfully",
    data: result,
  });
});

// Get single Area
const getSingleArea = catchAsync(async (req, res) => {
  const result = await AreaServices.getSingleAreaById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Area retrieved successfully",
    data: result,
  });
});

// Update Area
const updateArea = catchAsync(async (req, res) => {
  const result = await AreaServices.updateArea(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Area updated successfully",
    data: result,
  });
});

// Delete Area
const deleteArea = catchAsync(async (req, res) => {
  const result = await AreaServices.deleteArea(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Area deleted successfully",
    data: result,
  });
});

export const AreaControllers = {
  addArea,
  getAllAreas,
  getSingleArea,
  updateArea,
  deleteArea,
};
