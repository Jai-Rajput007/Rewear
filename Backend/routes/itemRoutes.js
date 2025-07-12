const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post("/", protect, upload.array("images", 5), async (req, res) => {
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

    const tagArray = typeof tags === "string" ? tags.split(",").map(tag => tag.trim()) : tags;
    const imageUrls = req.files.map((file) => file.path);

    const newItem = new Item({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tagArray,
      imageUrls,
      listedBy: req.user._id,
    });

    await newItem.save();
    res.status(201).json({ message: "Item with images listed successfully", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Item upload failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find({ isApproved: true });
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

router.patch("/approve/:id", protect, adminMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.isApproved = true;
    await item.save();

    res.json({ message: "Item approved successfully", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Approval failed" });
  }
});

module.exports = router;
