import { useContext } from "react";
import { cartContext } from "../../context/context";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./MyOrders.css";
import { assets } from "../../assets/frontend_assets/assets";
const MyOrders = () => {
  const { URL, token } = useContext(cartContext);
  const [data, setData] = useState([]);
  const orderItems = async () => {
    const response = await axios.post(
      `${URL}/api/orders/userorders`,
      {},
      {
        headers: { token },
      },
    );

    setData(response.data.data);
  };
  const trackOrderHandler = async () => {
    await orderItems();
    // const response = await axios.post(
    //   `${URL}/api/orders/userorders`,
    //   {},
    //   {
    //     headers: { token },
    //   }
    // );
    // const totalOrderItems = response.data.data;
    // const item = totalOrderItems.filter((item) => {
    //   return item._id === id;
    // });
  
  };
  useEffect(() => {

    if (token) {
      orderItems();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders </h2>
      <div className="container">
        {data
          .slice()
          .reverse()
          .map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " " + "x" + " " + item.quantity;
                    } else {
                      return item.name + " " + "x" + " " + item.quantity + ",";
                    }
                  })}
                </p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>{" "}
                </p>
                <button onClick={trackOrderHandler}>Track Order</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyOrders;
