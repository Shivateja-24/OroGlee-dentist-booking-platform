const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dentistRoutes = require("./routes/dentists");
const appointmentRoutes = require("./routes/appointments");
const authRoutes = require("./routes/auth");

app.use("/api/dentists", dentistRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
