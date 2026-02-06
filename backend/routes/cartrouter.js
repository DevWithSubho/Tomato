import express from "express";
import {
  addItem,
  getCart,
  removeItem,
  deleteCartItem,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addItem);
cartRouter.delete("/remove", authMiddleware, removeItem);
cartRouter.get("/cardList", authMiddleware, getCart);
cartRouter.put("/delete", authMiddleware, deleteCartItem);
export default cartRouter;
