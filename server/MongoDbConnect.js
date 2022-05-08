import mongoose from "mongoose";

export const MongodbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connect");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
