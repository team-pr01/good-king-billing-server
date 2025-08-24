import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ClientServices } from "./client.services";

// Add client
const addClient = catchAsync(async (req, res) => {
  const result = await ClientServices.addClient(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Client created successfully",
    data: result,
  });
});

// Get all clients with search & filters
const getAllClients = catchAsync(async (req, res) => {
  const { keyword, status, area } = req.query;
  const result = await ClientServices.getAllClients(
    keyword as string,
    status as string,
    area as string
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Clients retrieved successfully",
    data: result,
  });
});

// Get single client by ID
const getSingleClient = catchAsync(async (req, res) => {
  const result = await ClientServices.getSingleClientById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client retrieved successfully",
    data: result,
  });
});

// Update client
const updateClient = catchAsync(async (req, res) => {
  const result = await ClientServices.updateClient(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client updated successfully",
    data: result,
  });
});

// Delete client
const deleteClient = catchAsync(async (req, res) => {
  const result = await ClientServices.deleteClient(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Client deleted successfully",
    data: result,
  });
});

export const ClientControllers = {
  addClient,
  getAllClients,
  getSingleClient,
  updateClient,
  deleteClient,
};
