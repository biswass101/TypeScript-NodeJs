import mongoose from "mongoose";
import { IAdmin } from "./admin.interface";

const adminSchema = new mongoose.Schema<IAdmin>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contactInfo: String,

  address: String,
});

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
