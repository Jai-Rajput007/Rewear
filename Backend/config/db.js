const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("MongoDB connected successfully!");

    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB reconnected successfully!');
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Don't exit the process, let it retry
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

module.exports = connectDB;
