import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://Paul_Subhajit:Subhapl1234@cluster0.1xmhmpl.mongodb.net/food-app?"
    )
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.error("DB connection failed ❌", err);
    });
};
