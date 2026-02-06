import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cartContext } from "../../context/context";
import "./Verify.css";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const ranRef = useRef(false);
  const { URL } = useContext(cartContext);
  const navigate = useNavigate();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderid");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${URL}/api/orders/verify`, {
        success,
        orderId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/myOrders");
      } else {
        toast.error(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Verification failed");
      try {
        navigate("/");
      } catch (e) {
        console.log("navigate error", e);
      }
    }
  };

  useEffect(() => {
    if (ranRef.current) return; // prevent double-run in React StrictMode (dev)
    if (!URL) {
      console.error(
        "VITE_BACKEND_URL is not defined (frontend context URL is falsy)",
      );
      toast.error("Server URL not configured");
      return;
    }
    ranRef.current = true;
    verifyPayment();
  }, [URL]);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
