import express from "express";
import postRoutes from "./routes/postRoutes.js";
import workRoutes from "./routes/workRoutes.js";
import categorieRoutes from "./routes/categorieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authroutes from "./routes/authroutes.js";
// import deleteRoutes from "./routes/deleteRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const app = express();
mongoose.connect(process.env.URI_MONGO);

app.use(express.json());
app.use("/api", postRoutes);
app.use("/api", workRoutes);
app.use("/api", categorieRoutes);
app.use("/api", userRoutes);
app.use("/api", authroutes);
// app.use("/api", deleteRoutes);

app.listen(4000, MessagePort());

function MessagePort() {
  console.log("Esta online");
}
