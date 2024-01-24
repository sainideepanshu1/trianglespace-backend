const mongoose = require("mongoose");

const reachOutSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    services: {
      type: Array,
      required: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const reachOut = mongoose.model("Reach-Out", reachOutSchema);

module.exports = reachOut;
