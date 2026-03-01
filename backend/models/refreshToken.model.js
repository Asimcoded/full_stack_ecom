import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Userauth',
      required: true,
    },
    token: {    
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken

