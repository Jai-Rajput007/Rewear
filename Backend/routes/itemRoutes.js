const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      tags
    } = req.body;

    const newItem = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags,
      listedBy: req.user._id,
    });

    await newItem.save();
    res.status(201).json({ message: "Item listed successfully", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Item upload failed" });
  }
});

module.exports = router;
