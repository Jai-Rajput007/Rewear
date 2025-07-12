const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/adminMiddleware");
const Item = require("../models/Item");

// Approve item
router.patch("/approve/:itemId", protect, isAdmin, async (req, res) => {
  const item = await Item.findById(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.isApproved = true;
  await item.save();
  res.json({ message: "Item approved", item });
});

// Reject/delete item
router.delete("/reject/:itemId", protect, isAdmin, async (req, res) => {
  const item = await Item.findById(req.params.itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });

  await item.remove();
  res.json({ message: "Item rejected and removed" });
});

module.exports = router;
