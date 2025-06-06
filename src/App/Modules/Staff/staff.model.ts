import mongoose from "mongoose";
import { IStaff } from "./staff.interface";

const staffSchema = new mongoose.Schema<IStaff>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contactInfo: String,
    department: String,
  },
  {
    timestamps: true,
  }
);

export const Staff = mongoose.model<IStaff>("Staff", staffSchema);
