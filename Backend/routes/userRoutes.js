const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.name}!`,
    user: req.user,
  });
});

module.exports = router;
