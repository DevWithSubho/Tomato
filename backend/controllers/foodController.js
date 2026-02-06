import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food
const addFood = async (req, res) => {
  const image_filename = `${req.file.filename}`;
  const { name, description, price, category } = req.body;
  const food = new foodModel({
    name,
    description,
    price,
    image: image_filename,
    category,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (err) {
    res.json({ success: false, message: "Error" });
  }
};

//list food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
   
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  const { id } = req.body;
  try {
    const food = await foodModel.findById(id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export { addFood, listFood, removeFood };
