import { Schema, model } from "mongoose";
import { TArea } from "./area.interface";

const AreaSchema = new Schema<TArea>(
  {
    state: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Area = model<TArea>("Area", AreaSchema);
export default Area;
