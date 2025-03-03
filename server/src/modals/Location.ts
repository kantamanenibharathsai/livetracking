import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
//   deviceId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
//   timestamp: { type: Date, default: Date.now },
});

export const Location = mongoose.model("Location", locationSchema);
