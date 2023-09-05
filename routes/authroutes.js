import express from "express";
import mongoose from "mongoose";
import authSchema from "../models/authSchema.js";
const router = express.Router();

const authentications = mongoose.model("authentications", authSchema);

router.post("/auth", async (req, res) => {
  try {
    const query = await authentications.findOne({
      email: req.body.email,
      password: req.body.password,
    });
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
