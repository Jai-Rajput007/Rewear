<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Swap = require('../models/Swap');
const Item = require('../models/Item');
const protect = require('../middlewares/authMiddleware');

// @route   POST api/swaps
// @desc    Create a new swap request
// @access  Private
router.post('/', protect, async (req, res) => {
  const { itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.listedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ msg: 'You cannot swap for your own item' });
    }

    const existingSwap = await Swap.findOne({
      itemRequested: itemId,
      requester: req.user._id,
    });

    if (existingSwap) {
      return res.status(400).json({ msg: 'You have already requested a swap for this item' });
    }

    const newSwap = new Swap({
      itemRequested: itemId,
      requester: req.user._id,
      owner: item.listedBy,
    });

    const swap = await newSwap.save();
    res.status(201).json(swap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/swaps/my-swaps
// @desc    Get all swaps for the logged-in user
// @access  Private
router.get('/my-swaps', protect, async (req, res) => {
  try {
    const incomingRequests = await Swap.find({ owner: req.user._id, status: 'pending' })
      .populate('requester', 'name')
      .populate('itemRequested', 'title images');

    const outgoingRequests = await Swap.find({ requester: req.user._id })
      .populate('owner', 'name')
      .populate('itemRequested', 'title images');

    res.json({ incomingRequests, outgoingRequests });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/swaps/:id
// @desc    Accept or reject a swap request
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status update' });
  }

  try {
    let swap = await Swap.findById(req.params.id);

    if (!swap) {
      return res.status(404).json({ msg: 'Swap not found' });
    }

    if (swap.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (swap.status !== 'pending') {
      return res.status(400).json({ msg: `Swap has already been ${swap.status}` });
    }

    swap.status = status;
    await swap.save();

    // If accepted, mark the item as unavailable
    if (status === 'accepted') {
      await Item.findByIdAndUpdate(swap.itemRequested, { status: 'swapped' });
      // Optionally, reject other pending swaps for this item
      await Swap.updateMany(
        { itemRequested: swap.itemRequested, status: 'pending' },
        { status: 'rejected' }
      );
    }

    res.json(swap);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
=======
const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const SwapRequest = require("../models/SwapRequest");
const Item = require("../models/Item");

//Send swap request
router.post("/request/:itemId", protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.listedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot request your own item" });
    }

    const existing = await SwapRequest.findOne({
      item: item._id,
      requestedBy: req.user._id,
      status: "pending"
    });

    if (existing) return res.status(400).json({ message: "Swap already requested" });

    const request = new SwapRequest({
      item: item._id,
      requestedBy: req.user._id,
      requestedTo: item.listedBy,
    });

    await request.save();
    res.status(201).json({ message: "Swap request sent", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending swap request" });
  }
});

//Get all swap requests sent to logged-in user
router.get("/my-requests", protect, async (req, res) => {
  try {
    const requests = await SwapRequest.find({ requestedTo: req.user._id })
      .populate("item")
      .populate("requestedBy", "name email");

    res.json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

//Accept or reject a swap request
router.patch("/:requestId/respond", protect, async (req, res) => {
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const request = await SwapRequest.findById(req.params.requestId).populate("item");

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.requestedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    if (status === "accepted") {
      request.item.status = "swapped";
      await request.item.save();
    }

    res.json({ message: `Request ${status}`, request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update request" });
>>>>>>> a18838929c1d1b424a82a7fdffa862ca161457be
  }
});

module.exports = router;
