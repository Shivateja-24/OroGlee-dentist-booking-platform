const express = require("express");
const router = express.Router();
const Dentist = require("../models/Dentist");

router.get("/", async (req, res) => {
  try {
    const dentists = await Dentist.find();
    res.json(dentists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const dentist = new Dentist(req.body);
    await dentist.save();
    res.status(201).json(dentist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
