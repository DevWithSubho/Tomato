import "./exploremenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { categorySliceActions } from "../../store/categoryslice";
const ExploreMenu = () => {
  const category = useSelector((store) => store.category);
  const dispatch = useDispatch();
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from our diverse selection of cuisines, from local favorites to
        international delicacies. Discover mouthwatering dishes prepared by
        expert chefs using the finest ingredients. Whether you're craving
        comfort food or looking to try something new, our menu has something for
        everyone.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="menu-list-item"
              onClick={() =>
                dispatch(categorySliceActions.chngeInitialState(item.menu_name))
              }
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
