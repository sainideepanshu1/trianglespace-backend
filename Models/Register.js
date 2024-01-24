const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

const GrowWithUs = mongoose.model("GrowWithUs", RegisterSchema);

module.exports = GrowWithUs;
