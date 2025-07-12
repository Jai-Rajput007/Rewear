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

<<<<<<< HEAD
// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;
    const items = await Item.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('listedBy', 'name');
    res.json({ items });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/items/my-items
// @desc    Get all items for the logged-in user
// @access  Private
router.get('/my-items', protect, async (req, res) => {
  try {
    const items = await Item.find({ listedBy: req.user._id }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/items/:id
// @desc    Get single item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('listedBy', 'name email');

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Item not found' });
    }
    res.status(500).send('Server Error');
=======
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
>>>>>>> a18838929c1d1b424a82a7fdffa862ca161457be
  }
});

module.exports = router;
