import express from "express";
const router = express.Router();
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: { type: String, index: true },
  email: { type: String, unique: true },
  age: Number,
  password: String,
});

const User = mongoose.model("User", userSchema);
async function createUser(req, res) {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
    username: req.body.username,
  });
  try {
    await newUser.save();
    console.log("Usuário inserido com sucesso!");
  } catch (err) {
    console.log("Ocorreu um erro:", err);
  }
  res.status(201).send("createUser");
}
async function getAlluser(req, res) {
  try {
    const user = await User.find();
    ///colocar mongo para pegar todos os registros .find
    console.log("Users recuperados com sucesso");
    res.status(200).json(user);
  } catch (err) {
    console.log("Ocorreu um erro:", err);
    res.status(500).json({ error: "Erro ao recuperar os user" });
  }
}
async function deleteUser(req, res) {
  // console.log(req.params.id);
  const userID = req.params.id;

  try {
    const deleteUser = await User.deleteOne({
      _id: userID,
    });
    if (deleteUser.deletedCount === 0) {
      res.status(400).send("nenhum usuario");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function updateUser(req, res) {
  // console.log(req.params.id);
  const userID = req.params.id;
  const updateData = req.body;

  try {
    const updateUser = await User.updateOne({ _id: userID }, updateData);
    if (updateWork.nModified === 0) {
      res.status(404).send("nenhum user encontrado");
    } else {
      res.status(200).json({ message: "user atualizado" });
    }
  } catch (error) {
    res.status(500).send("error");
  }
}
async function getUser(req, res) {
  console.log("ENTREI AQUI!");
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("nenhum usuario encontrado no banco");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

router.get("/user", getAlluser);
router.post("/user", createUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", updateUser);
router.get("/user/:id", getUser);

export default router;
