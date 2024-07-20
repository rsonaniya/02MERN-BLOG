import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGOURI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const app = express();

app.listen(3000, () => console.log("server is runing on port 3000"));
