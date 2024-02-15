import mongoose from "mongoose";

const phoneSchema = mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
