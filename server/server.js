import express from "express";
import dotenv from "dotenv";
import { MongoDbConnect } from "./mongoConnect.js";
import Upload from "./Model.js";
import cors from "cors";
import path from "path";
const __dirname = path.join();

dotenv.config();
MongoDbConnect();
const app = express();
app.use(express.json());
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
const port = process.env.PORT || 5000;

// Get images
app.get("/all", async (req, res) => {
  try {
    const image = await Upload.find({}).sort({ _id: -1 });
    res.status(200).json(image);
  } catch (error) {
    res.status(404).json({ msg: "Data Error" });
  }
});

// Post image
app.post("/", async (req, res) => {
  try {
    const { image, title } = req.body;

    const singleImage = {
      image,
      title,
    };
    if (singleImage) {
      const user = await Upload.create({
        image,
        title,
      });
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(404).json({ msg: "Invalid data" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
