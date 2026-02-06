import { useEffect } from "react";
import { createContext, useState } from "react";
import { useDispatch } from "react-redux";

import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const cartContext = createContext();
export const ContextProvider = ({ children }) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const delivaryFees = 5;
  const dispatch = useDispatch();
  const [foodList, setFoodList] = useState([]);
  const [cartItems, setcartItems] = useState({});

  const loadCartData = async (token) => {
    const response = await axios.get(
      `${URL}/api/cart/cardList`,

      {
        headers: { token },
      },
    );
    const cartItems = response.data.cartData;
    setcartItems((prev) => {
      return { ...prev, ...cartItems };
    });
  };
  //getting foodList by fetching items and set token into localstorage
  useEffect(() => {
    const foodData = async () => {
      try {
        const response = await axios.get(`${URL}/api/food/list`);

        if (response.data.success) {
          setFoodList(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error");
      }
    };
    foodData();

    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      loadCartData(localStorage.getItem("token"));
    }
  }, []);

  const addItem = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => {
        return { ...prev, [itemId]: 1 };
      });
    } else {
      setcartItems((prev) => {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      });
    }
    try {
      if (token) {
        await axios.post(
          `${URL}/api/cart/add`,
          {
            id: itemId,
          },
          { headers: { token: localStorage.getItem("token") } },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeItems = async (itemId) => {
    setcartItems((prev) => {
      return { ...prev, [itemId]: prev[itemId] - 1 };
    });

    try {
       await axios.delete(`${URL}/api/cart/remove`, {
        data: {
          id: itemId,
        },

        headers: { token: localStorage.getItem("token") },
      });

    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = (itemId) => {
    setcartItems((prev) => {
      return { ...prev, [itemId]: 0 };
    });
    if (token) {
      try {
        axios.put(
          `${URL}/api/cart/delete`,
          { id: itemId },
          { headers: { token: localStorage.getItem("token") } },
        );

      } catch (error) {
        console.log("err", error);
      }
    }
  };

  const cartSubtotal = Object.entries(cartItems).reduce((acc, [id, qty]) => {
    const food = foodList.find((f) => f._id === id);
    return food ? acc + food.price * qty : acc;
  }, 0);
  const Total = (cartSubtotal + delivaryFees).toFixed(2);
  //calculate subtotal price
  // const subTotal = cartStore.reduce((accumulation, cartItem) => {
  //   const foodItem = foodList.find((item) => item._id === cartItem.id);
  //   if (!foodItem) return accumulation;
  //   return accumulation + foodItem.price * cartItem.quantity;
  // }, 0);

  const values = {
    foodList,

    delivaryFees,
    dispatch,
    URL,
    token,
    setToken,
    addItem,
    removeItems,
    cartItems,
    cartSubtotal,
    deleteItem,
    Total,
  };
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};
