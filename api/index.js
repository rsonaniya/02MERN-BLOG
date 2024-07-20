import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGOURI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(3000, () => console.log("server is runing on port 3000"));
