import mongoose from "mongoose";

const postSchama = new mongoose.Schema({
  title: String,
  description: String,
  categories: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model.apply("Post", postSchama);
