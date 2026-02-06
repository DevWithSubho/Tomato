import { useContext } from "react";
import { cartContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { subTotal, delivaryFees } = useContext(cartContext);
  const navigate = useNavigate();
  return (
    <div className="cart-total">
      <h2>Cart Totals</h2>
      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{subTotal.toFixed(2)}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivary</p>
          <p>{delivaryFees}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>${(subTotal + delivaryFees).toFixed(2)}</b>
        </div>
      </div>
      <button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
    </div>
  );
};

export default CartTotal;
