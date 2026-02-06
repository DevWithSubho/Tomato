import User from "../models/userModel.js";
//to add item into the cart
const addItem = async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  try {
    const userData = await User.findById(userId);
    let cartData = userData.cartData;
    if (!cartData[id]) {
      cartData[id] = 1;
    } else {
      cartData[id] += 1;
    }
    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//to remove item from the cart
const removeItem = async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;
  try {
    const userData = await User.findById(userId);
    let cartData = userData.cartData;
    if (cartData[id] > 0) {
      cartData[id] -= 1;
    }
    await User.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Remove From  Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//delete carditem
const deleteCartItem = async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;
  try {
    const userData = await User.findById(userId); 
    const cartData = userData.cartData;
    cartData[id] = 0;
    await User.findByIdAndUpdate(userId, { cartData });
    
    res.json({ sucess: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//to get item from cart
const getCart = async (req, res) => {
  const userId = req.userId;
  try {
    const userData = await User.findById(userId);
    const cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addItem, removeItem, getCart, deleteCartItem };
