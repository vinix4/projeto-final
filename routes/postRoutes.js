import { getRounds } from "bcrypt";
import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const postSchama = new mongoose.Schema({
  title: String,
  description: String,
  // categories: mongoose.Schema.Types.ObjectId,
  categories: String,
});
const Post = mongoose.model("Post", postSchama);

async function savePost(req, res) {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.categories,
    });
    await newPost.save();
    console.log("post inserido");
    res.status(201).json({ message: "post criado" });
  } catch (err) {
    console.log("ocorreu um erro:", err);
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    ///colocar mongo para pegar todos os registros .find
    console.log("Posts recuperados com sucesso");
    res.status(200).json(posts);
  } catch (err) {
    console.log("Ocorreu um erro:", err);
    res.status(500).json({ error: "Erro ao recuperar os posts" });
  }
}
async function deletePost(req, res) {
  // console.log(req.params.id);
  const postID = req.params.id;

  try {
    const deletePost = await Post.deleteOne({
      _id: postID,
    });
    if (deletePost.deletedCount === 0) {
      res.status(400).send("nenhum post");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function updatePost(req, res) {
  // console.log(req.params.id);
  const postID = req.params.id;
  const updateData = req.body;

  try {
    const updatePost = await Post.updateOne({ _id: postID }, updateData);
    if (updatePost.nModified === 0) {
      res.status(404).send("nenhum post encontrado");
    } else {
      res.status(200).json({ message: "post atualizado" });
    }
  } catch (error) {
    res.status(500).send("error");
  }
}

router.delete("/posts/:id", deletePost);
router.get("/posts", getAllPosts);
router.post("/posts", savePost);
router.patch("/posts/:id", updatePost);
//este é o momento que dizemos para a plicação qual funcão sera acessada quando chamarmos a rota /post com o metodo post

export default router;
