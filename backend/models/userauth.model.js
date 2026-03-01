import mongoose from "mongoose";

const userauthSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    kycStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isDeleted : {type : Boolean, default : false}
  },
  { timestamps: true },
);
const User = mongoose.model("Userauth", userauthSchema);
export default User;
