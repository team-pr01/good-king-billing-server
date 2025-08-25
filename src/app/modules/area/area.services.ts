import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Area from "./area.model";
import { TArea } from "./area.interface";

// Add Area
const addArea = async (payload: TArea) => {
  const result = await Area.create(payload);
  return result;
};

// Get all Areas
const getAllAreas = async (keyword:string) => {
  let query = {};

  if (keyword) {
    query = {
      $or: [
        { state: { $regex: keyword, $options: "i" } },
        { district: { $regex: keyword, $options: "i" } },
        { city: { $regex: keyword, $options: "i" } },
        { area: { $regex: keyword, $options: "i" } },
      ],
    };
  }
  const result = await Area.find(query);
  return result;
};

// Get single Area by ID
const getSingleAreaById = async (id: string) => {
  const result = await Area.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Area not found");
  }
  return result;
};

// Update Area
const updateArea = async (id: string, payload: Partial<TArea>) => {
  const existing = await Area.findById(id);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Area not found");
  }

  const result = await Area.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete Area
const deleteArea = async (id: string) => {
  const result = await Area.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Area not found");
  }
  return result;
};

export const AreaServices = {
  addArea,
  getAllAreas,
  getSingleAreaById,
  updateArea,
  deleteArea,
};