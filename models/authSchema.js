import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  age: Number,
  password: String,
});
export const authentication = mongoose.model("Authentication", authSchema);
