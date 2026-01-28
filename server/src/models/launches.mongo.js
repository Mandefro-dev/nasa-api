const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    require: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
  },
  customers: [String],
  upcoming: {
    required: true,
    type: Boolean,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});
//connects launchesSchema with the "launches" collections

module.exports = mongoose.model("Launch", launchesSchema);
