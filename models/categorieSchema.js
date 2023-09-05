import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
  categories: mongoose.Schema.Types.ObjectId,
});

export default mongoose.model.apply("Categorie", categorieSchema);
