import "./foodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { cartContext } from "../../context/context";
import { useContext } from "react";
const FoodItem = ({ id, name, image, price, description }) => {
  const { URL, addItem, cartItems, removeItems } = useContext(cartContext);
  const itemCounter = cartItems[id] ? cartItems[id] : 0;
  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img
          className="food-item-image"
          src={`${URL}/images/${image}`}
          alt=""
        />
        {!itemCounter ? (
          <img
            className="add"
            onClick={() => addItem(id)}
            src={assets.add_icon_white}
            alt=""
          ></img>
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeItems(id)}
            />
            <p>{itemCounter}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addItem(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
