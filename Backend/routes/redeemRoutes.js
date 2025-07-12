const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const Item = require("../models/Item");
const User = require("../models/User");

router.patch("/redeem/:itemId", protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const user = await User.findById(req.user._id);

    if (!item || !item.isApproved || item.status !== "available") {
      return res.status(400).json({ message: "Item not available for redemption" });
    }

    if (user.points < item.pointCost) {
      return res.status(400).json({ message: "Not enough points to redeem this item" });
    }

    // Deduct points and mark as redeemed
    user.points -= item.pointCost;
    item.status = "redeemed";

    await user.save();
    await item.save();

    res.json({ message: "Item redeemed successfully", item, userPoints: user.points });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Redemption failed" });
  }
});

module.exports = router;
