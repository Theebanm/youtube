import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String },
  name: { type: String },
  desc: { type: String },
  mobile: { type: String },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
