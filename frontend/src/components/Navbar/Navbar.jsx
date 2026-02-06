import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSliceActions } from "../../store/loginSlice";
import { cartContext } from "../../context/context";
const Navbar = () => {
  const { token, setToken, cartItems } = useContext(cartContext);
  const hasItemsInCart = Object.values(cartItems).some((count) => count > 0);
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>

          <div className={hasItemsInCart ? "dot" : ""}></div>
        </div>
        {!token ? (
          <button onClick={() => dispatch(loginSliceActions.signValueTrue())}>
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>orders</p>
              </li>
              <hr />
              <li onClick={logoutHandler}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
