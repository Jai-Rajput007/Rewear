const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  type: String, // e.g., "top", "bottom", "accessory"
  size: String,
  condition: String,
  tags: [String],
  imageUrls: [String],

  // Updated status to include "redeemed"
  status: {
    type: String,
    enum: ["available", "swapped", "redeemed"],
    default: "available",
  },

  // Add point cost
  pointCost: {
    type: Number,
    default: 10,
  },

  isApproved: { type: Boolean, default: false },
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Item", itemSchema);
