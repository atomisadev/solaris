import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: String,
});

export const Email =
  mongoose.models.Email || mongoose.model("Email", emailSchema);
