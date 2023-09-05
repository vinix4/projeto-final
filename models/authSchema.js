import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  age: Number,
  password: String,
});
export default mongoose.model("Authentications", authSchema);
