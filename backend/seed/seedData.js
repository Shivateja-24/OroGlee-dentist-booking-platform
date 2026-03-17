const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("../models/Admin");

dotenv.config({ path: ".env" });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({ username: "admin", password: hashedPassword });
    console.log("Admin created successfully");

    await mongoose.disconnect();
    console.log("Done");
  } catch (error) {
    console.error(error.message);
  }
};

seedAdmin();
