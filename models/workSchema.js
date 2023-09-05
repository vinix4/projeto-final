import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model.apply("Work", workSchema);
