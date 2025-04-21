import mongoose from "mongoose";
import { IStaff } from "./staff.interface";


const staffSchema = new mongoose.Schema<IStaff>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Staff']
  },
  contactInfo: {
    type: String,
    required: true,
  },
});

export const Staff = mongoose.model<IStaff>("Staff", staffSchema);

