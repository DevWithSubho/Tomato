import { useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/admin_assets/assets.js";


const Orders = () => {
const url = import.meta.env.VITE_BACKEND_URL;
  const [orderLists, setOrderlists] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/orders/orderlists`);
   
      setOrderlists(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };
  const handleOnchnge = async (e, id) => {
    let currentStatus = e.target.value;
    try {
      const response = await axios.post(`${url}/api/orders/status`, {
        id,
        currentStatus,
      });

      if (response.data.success) {
        await fetchList();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orderLists
          .slice()
          .reverse()
          .map((order) => {
            return (
              <div key={order._id} className="order-item">
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order-item-food">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ",";
                      }
                    })}
                  </p>
                  <p className="order-item-customerName">
                    {order.address.firstName + " " + order.address.lastname}
                  </p>
                  <div className="customer-address">
                    <p>{order.address.street + ","}</p>
                    <p>
                      {order.address.city +
                        "," +
                        order.address.state +
                        "," +
                        order.address.Country +
                        "," +
                        order.address.zipcode}
                    </p>
                  </div>
                  <p className="customer-phone">{order.address.phone}</p>
                </div>
                <p> Items: {order.items.length}</p>
                <p>${order.amount}</p>
                <select
                  className="order-items-select"
                  onChange={(e) => handleOnchnge(e, order._id)}
                  value={order.status}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivary">Out for delivary</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Orders;
