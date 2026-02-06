import { useNavigate } from "react-router-dom";
import "./cartEmtyMss.css";
import { assets } from "../../assets/frontend_assets/assets";

const CartEmptyMssg = () => {
  const navigate = useNavigate();

  return (
    <div className="cart-empty">
      <img src={assets.bag_icon} alt="Empty Cart" />
      <h2>Your Cart is Empty</h2>
      <p>
        Looks like you haven't added anything to your cart yet. Browse our
        delicious menu and discover your next favorite meal!
      </p>
      <button onClick={() => navigate("/")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M3 12l6-6M3 12l6 6" />
        </svg>
        Continue Shopping
      </button>
    </div>
  );
};
export default CartEmptyMssg;
