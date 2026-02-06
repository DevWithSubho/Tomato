import { useContext, useEffect } from "react";
import { cartContext } from "../../context/context";
import "./placeorder.css";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { cartSubtotal, delivaryFees, cartItems, foodList, Total, URL, token } =
    useContext(cartContext);
  const navigate = useNavigate();
  const firstName = useRef("");
  const lastname = useRef("");
  const emailAddress = useRef("");
  const street = useRef("");
  const city = useRef("");
  const state = useRef("");
  const zipcode = useRef("");
  const Country = useRef("");
  const phone = useRef("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const delivaryAddress = {
      firstName: firstName.current.value,
      lastname: lastname.current.value,
      emailAddress: emailAddress.current.value,
      street: street.current.value,
      city: city.current.value,
      state: state.current.value,
      zipcode: zipcode.current.value,
      Country: Country.current.value,
      phone: phone.current.value,
    };
    const orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let newItem = item;
        newItem.quantity = cartItems[item._id];
        orderItems.push(newItem);
      }
    });
    let orderdata = {
      address: delivaryAddress,
      items: orderItems,
      amount: Total,
    };

    let response = await axios.post(`${URL}/api/orders/place`, orderdata, {
      headers: { token },
    });
    console.log(response);
    if (response.data.success) {
      const { session_url } = response.data;

      window.location.replace(session_url);
    } else {
      toast.error("Error");
    }
  };
  const authChecked = useRef(false);
  useEffect(() => {
    if (authChecked.current) return;
    authChecked.current = true;
    if (!token) {
      toast.error("Signup first please");
      navigate("/cart");
    }
  }, [token]);
  return (
    <div>
      <form className="place-order" onSubmit={onSubmitHandler}>
        <div className="place-order-left">
          <p className="title">Delivary Information</p>
          <div className="multi-fields">
            <input
              required
              type="text"
              placeholder="First name"
              ref={firstName}
            />
            <input
              required
              type="text"
              placeholder="Last name"
              ref={lastname}
            />
          </div>
          <input
            required
            type="text"
            placeholder="Email address"
            ref={emailAddress}
          />
          <input required type="text" placeholder="Street" ref={street} />
          <div className="multi-fields">
            <input required type="text" placeholder="City" ref={city} />
            <input required type="text" placeholder="State" ref={state} />
          </div>
          <div className="multi-fields">
            <input required type="text" placeholder="Zip code" ref={zipcode} />
            <input required type="text" placeholder="Country" ref={Country} />
          </div>
          <input required type="text" placeholder="phone" ref={phone} />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${cartSubtotal}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivary</p>
                <p>${delivaryFees}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${cartSubtotal + delivaryFees}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO Payment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
