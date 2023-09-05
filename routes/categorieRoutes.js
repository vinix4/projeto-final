import express from "express";
const router = express.Router();
import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
  categories: String,
  // categories: mongoose.Schema.Types.ObjectId,
});
const Categorie = mongoose.model("Categorie", categorieSchema);

async function CategorieRoutes(req, res) {
  try {
    const newCategorie = new Categorie({
      categories: req.body.categories,
    });
    await newCategorie.save();
    console.log("categoria inserida");
    res.status(201).json({ message: "categoria criado" });
  } catch (err) {
    console.log("ocorreu um erro:", err);
  }
}
async function getAllCategorie(req, res) {
  try {
    const categorie = await Categorie.find();
    ///colocar mongo para pegar todos os registros .find
    console.log("categorias recuperados com sucesso");
    res.status(200).json(categorie);
  } catch (err) {
    console.log("Ocorreu um erro:", err);
    res.status(500).json({ error: "Erro ao recuperar os categorias" });
  }
}
async function deleteCategorie(req, res) {
  // console.log(req.params.id);
  const categorieID = req.params.id;

  try {
    const deleteCategorie = await Categorie.deleteOne({
      _id: categorieID,
    });
    if (deleteCategorie.deletedCount === 0) {
      res.status(400).send("nenhum post");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function updateCategorie(req, res) {
  // console.log(req.params.id);
  const categorieID = req.params.id;
  const updateData = req.body;

  try {
    const updateCategorie = await Categorie.updateOne(
      { _id: categorieID },
      updateData
    );
    if (updateCategorie.nModified === 0) {
      res.status(404).send("nenhum post encontrado");
    } else {
      res.status(200).json({ message: "post atualizado" });
    }
  } catch (error) {
    res.status(500).send("error");
  }
}

router.get("/categorie", getAllCategorie);
router.post("/categorie", CategorieRoutes);
router.delete("/categorie/:id", deleteCategorie);
router.patch("/categorie/:id", updateCategorie);

export default router;
