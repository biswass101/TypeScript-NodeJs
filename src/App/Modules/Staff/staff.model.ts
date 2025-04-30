import mongoose from "mongoose";
import { IStaff } from "./staff.interface";


const staffSchema = new mongoose.Schema<IStaff>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: String,
  status: {
    type: String,
    enum: ["approved", "rejected"],
    required: true,
    default: 'approved'
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  },
  contactInfo: {
    type: String,
    // required: true,
  },
}, {
  timestamps: true
});

export const Staff = mongoose.model<IStaff>("Staff", staffSchema);

