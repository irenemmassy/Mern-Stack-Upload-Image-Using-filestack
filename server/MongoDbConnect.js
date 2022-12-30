import mongoose from "mongoose";

export const MongodbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
