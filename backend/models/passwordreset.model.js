import mongoose from "mongoose";

const passwordresetSchema = new mongoose.Schema({
  token: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Userauth",
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false
  },
});

const PasswordReset = mongoose.model("Passwordreset",passwordresetSchema)

export default PasswordReset