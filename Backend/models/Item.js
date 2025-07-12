const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  type: String, // e.g., "top", "bottom", "accessory"
  size: String,
  condition: String,
  tags: [String],
  imageUrls: [String], // I'll fill this in next step
  status: { type: String, default: "available" }, // available / swapped / removed
  isApproved: {type: Boolean, default: false},
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
