import express from "express";
import mongoose from "mongoose";
import { authentication } from "../models/authSchema.js";
const router = express.Router();

router.post("/auth", async (req, res) => {
  try {
    const query = await authentication.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(query);
    if (query) {
      res.status(200).json({ message: "usurio encontrado" });
    } else {
      res.status(404).send("nenhum usuario");
    }
    res.status(200).json({ message: "usuário encontrado" });
  } catch (error) {}
});

export default router;

// app.use(express.json());

// app.post("/auth", async (req, res) => {
//   try {
//     const query = await auth.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     res.status(200).json({ message: "usurio encontrado" });
//   } catch (error) {}
// });

// router.post("/auth", authSchema);

// export default router;
