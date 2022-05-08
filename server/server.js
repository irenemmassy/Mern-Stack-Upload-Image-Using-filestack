import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongodbConnect } from "./MongoDbConnect.js";
import Upload from "./Model.js";

dotenv.config();
MongodbConnect();
const app = express();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("Hellow");
});

// get all images
app.get("/all", async (req, res) => {
  try {
    const image = await Upload.find({}).sort({ _id: -1 });
    res.status(200).json(image);
  } catch (error) {
    res.status(404).json({ msg: "Data error" });
  }
});

// post image
app.post("/", async (req, res) => {
  try {
    const { image, title } = req.body;
    const createImage = {
      image,
      title,
    };
    if (createImage) {
      const newImage = await Upload.create(createImage);
      res.status(201).json(newImage);
    }
  } catch (error) {
    res.status(404).json({ msg: "Invalid Data" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
