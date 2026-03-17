const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    dentist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dentist",
      required: true,
    },
    status: { type: String, default: "Booked" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
