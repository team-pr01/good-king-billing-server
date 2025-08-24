/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "./client.model";
import { TClient } from "./client.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Add client
const addClient = async (payload: TClient) => {
  const result = await Client.create(payload);
  return result;
};

// Get all clients
const getAllClients = async (
  keyword?: string,
  status?: string,
  area?: string
) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { shopName: { $regex: keyword, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (area) {
    query.area = { $regex: area, $options: "i" };
  }

  const result = await Client.find(query);
  return result;
};

// Get single client by ID
const getSingleClientById = async (id: string) => {
  const result = await Client.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Client not found");
  }
  return result;
};

// Update client
const updateClient = async (id: string, payload: Partial<TClient>) => {
  const existing = await Client.findById(id);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Client not found");
  }

  const result = await Client.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete client
const deleteClient = async (id: string) => {
  const result = await Client.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Client not found");
  }
  return result;
};

export const ClientServices = {
  addClient,
  getAllClients,
  getSingleClientById,
  updateClient,
  deleteClient,
};
