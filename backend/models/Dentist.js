const mongoose = require("mongoose");

const dentistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  clinicName: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  specialization: { type: String, required: true },
  photo: { type: String },
});

module.exports = mongoose.model("Dentist", dentistSchema);
