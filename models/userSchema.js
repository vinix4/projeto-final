import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String, index: true },
  email: { type: String, unique: true },
  age: Number,
  password: String,
});

export default mongoose.model.apply("User", userSchema);
