import { useSelector } from "react-redux";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/foodItem";
import { useContext } from "react";
import { cartContext } from "../../context/context";
import LoadingSpinner from "../Loadingspinner/loadingSpinner";
const FoodDisplay = () => {
  const { foodList } = useContext(cartContext);
  const categoryFromUser = useSelector((foodCategory) => foodCategory.category);

  return (
    <div className="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.length === 0 && <LoadingSpinner />}
        {foodList.map((food, index) => {
          if (
            categoryFromUser === "All" ||
            categoryFromUser === food.category
          ) {
            return (
              <FoodItem
                key={index}
                id={food._id}
                name={food.name}
                image={food.image}
                price={food.price}
                description={food.description}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
