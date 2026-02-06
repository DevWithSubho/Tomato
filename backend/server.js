import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartrouter.js";
import orderRouter from "./routes/orderRoutes.js";
//app config
const app = express();

const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
//db connection
connectDB();

//api endpoint
app.use("/images", express.static("uploads"));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(PORT, () => {
  console.log(`server is runing on http://localhost:${PORT}`);
});
