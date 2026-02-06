import { useDispatch } from "react-redux";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";
import "./LoginPopup.css";
import { loginSliceActions } from "../../store/loginSlice";
import { useContext, useRef, useState } from "react";
import { cartContext } from "../../context/context";
import { toast } from "react-toastify";
const LoginPopup = () => {
  const { URL, token, setToken } = useContext(cartContext);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const [signupVal, setSignupVal] = useState("signup");

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/user/register`, {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      
      if (response.data.success) {
        toast.success("user registered sucessfully");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        dispatch(loginSliceActions.signValuefalse());
      } else {
        toast.error("something error please try again");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/user/login`, {
        email: email.current.value,
        password: password.current.value,
      });
 
      if (response.data.success) {
        toast.success("user logedin sucessfully");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        dispatch(loginSliceActions.signValuefalse());
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <div className="login-popup">
      <form
        action=""
        className="login-popup-container"
        onSubmit={signupVal === "signup" ? onRegisterHandler : onLoginHandler}
      >
        <div className="login-popup-title">
          <h2>{signupVal}</h2>
          <img
            onClick={() => dispatch(loginSliceActions.signValuefalse())}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {signupVal === "signup" ? (
            <input type="text" placeholder=" your name" ref={name} required />
          ) : (
            <></>
          )}
          <input type="email" placeholder="your email" ref={email} required />
          <input
            type="password"
            placeholder="password"
            ref={password}
            required
          />
        </div>

        <button type="submit">
          {signupVal === "signup" ? "create account" : "login"}
        </button>
        <div className="login-popup-condiotion">
          <input type="checkbox" id="check" required />

          <label htmlFor="check">
            By continuing, i agree to the terms of use & privacy policy
          </label>
        </div>
        {signupVal === "signup" ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setSignupVal("login")}>login here</span>
          </p>
        ) : (
          <p>
            create a new account?{" "}
            <span onClick={() => setSignupVal("signup")}>click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
