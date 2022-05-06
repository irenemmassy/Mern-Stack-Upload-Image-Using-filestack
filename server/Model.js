import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Upload = mongoose.model("Upload", UploadSchema);

export default Upload;
