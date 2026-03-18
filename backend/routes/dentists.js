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

router.get("/:id", async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id);
    if (!dentist) return res.status(404).json({ message: "Dentist not found" });
    res.json(dentist);
  } catch (e) {
    res.status(500).json({ message: e.message });
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
