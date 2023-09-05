import express from "express";
const router = express.Router();
import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: String,
  description: String,
  // categories: mongoose.Schema.Types.ObjectId,
});
const Work = mongoose.model("Work", workSchema);
async function workRoutes(req, res) {
  try {
    const newWork = new Work({
      title: req.body.title,
      description: req.body.description,
    });
    await newWork.save();
    console.log("word inserido");
    res.status(201).json({ message: "work criado" });
  } catch (err) {
    console.log("ocorreu um erro:", err);
  }
}
async function getAllwork(req, res) {
  try {
    const posts = await Work.find();
    ///colocar mongo para pegar todos os registros .find
    console.log("works recuperados com sucesso");
    res.status(200).json(posts);
  } catch (err) {
    console.log("Ocorreu um erro:", err);
    res.status(500).json({ error: "Erro ao recuperar os works" });
  }
}

async function deleteWork(req, res) {
  // console.log(req.params.id);
  const workID = req.params.id;

  try {
    const deleteWork = await Work.deleteOne({
      _id: workID,
    });
    if (deleteWork.deletedCount === 0) {
      res.status(400).send("nenhum work");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function updateWork(req, res) {
  // console.log(req.params.id);
  const workID = req.params.id;
  const updateData = req.body;

  try {
    const updateWork = await Work.updateOne({ _id: workID }, updateData);
    if (updateWork.nModified === 0) {
      res.status(404).send("nenhum work encontrado");
    } else {
      res.status(200).json({ message: "work atualizado" });
    }
  } catch (error) {
    res.status(500).send("error");
  }
}

router.get("/work", getAllwork);
router.post("/work", workRoutes);
router.delete("/work/:id", deleteWork);
router.patch("/work/:id", updateWork);

export default router;
