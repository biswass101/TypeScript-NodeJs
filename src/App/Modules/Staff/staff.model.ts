import mongoose from "mongoose";
import { IStaff } from "./staff.interface";

const staffSchema = new mongoose.Schema<IStaff>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  careDate: {
    type: Date,
    required: true,
  },

  contactInfo: {
    type: String,
    required: true,
  },
});

export const Staff = mongoose.model<IStaff>("Staff", staffSchema);

