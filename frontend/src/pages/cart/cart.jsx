import "./cart.css";
import CartEmptyMssg from "../../components/cartEmptyMssg/cartEmptyMssg";
import { useContext } from "react";
import { cartContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const {
    foodList,
    cartSubtotal,
    delivaryFees,
    URL,
    cartItems,
    addItem,
    removeItems,
    deleteItem,
    Total,
    token,
  } = useContext(cartContext);
 
  // Check if any item has quantity > 0
  const hasItemsInCart = Object.values(cartItems).some((count) => count > 0);

  // Calculate subtotal dynamically (optional if you already do inside context)

  return (
    <>
      {!hasItemsInCart && <CartEmptyMssg />}

      {hasItemsInCart && (
        <div className="cart">
          <div className="cart-items">
            <div className="card-item-title">
              <p>Items</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />

            {Object.entries(cartItems)
              .filter(([id, quantity]) => quantity > 0)
              .map(([id, quantity]) => {
                const foodItem = foodList.find((item) => item._id === id);

                return (
                  <div key={id} className="cart-item">
                    <img
                      src={`${URL}/images/${foodItem.image}`}
                      alt={foodItem.name}
                      className="cart-item-image"
                    />
                    <p className="cart-item-title">{foodItem.name}</p>
                    <p className="cart-item-price">${foodItem.price}</p>

                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn"
                        onClick={() => removeItems(id)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => addItem(id)}
                        disabled={quantity >= 10}
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-item-total">
                      ${(foodItem.price * quantity).toFixed(2)}
                    </p>

                    <button
                      className="cart-item-remove"
                      onClick={() => deleteItem(id)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
          </div>

          {/* CART TOTAL SECTION */}
          <div className="cart-bottom">
            <div className="cart-total">
              <h2>Cart Totals</h2>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${cartSubtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery</p>
                  <p>${delivaryFees}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${Total}</b>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!token) {
                    toast.error("Signup first please");
                    return;
                  }
                  navigate("/order");
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            <div className="cart-promocode">
              <div>
                <p>If you have a promo code, enter it here</p>
                <div className="cart-promocode-input">
                  <input type="text" placeholder="Promo code" />
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
