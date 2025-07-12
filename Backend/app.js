const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const swapRoutes = require("./routes/swapRoutes");
<<<<<<< HEAD
=======
const redeemRoutes = require("./routes/redeemRoutes");
>>>>>>> a18838929c1d1b424a82a7fdffa862ca161457be

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/swaps", swapRoutes);
<<<<<<< HEAD

=======
app.use("/api/items", redeemRoutes);
>>>>>>> a18838929c1d1b424a82a7fdffa862ca161457be

// Root
app.get("/", (req, res) => {
  res.send("ReWear backend is connected to MongoDB!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
