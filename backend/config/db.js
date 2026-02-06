import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.error("DB connection failed ❌", err);
    });
};
