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
  }
});

module.exports = router;
