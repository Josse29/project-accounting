import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
// middleware cors
app.use(cors());
// middleware jsonparse
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello from api");
});

// connect to mongodb atlas/compas
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(8000, () => {
      console.log(`App is Listening port on http://localhost:${PORT}`);
    });
    console.log("connected to mongodb");
  })
  .catch((err) => {
    throw err;
  });
